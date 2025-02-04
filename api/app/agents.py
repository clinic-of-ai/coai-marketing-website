import os
import random
from openai import OpenAI
from termcolor import colored
from typing import List, Dict, Optional, Any, Literal, TypedDict, cast
from pydantic import BaseModel
from openai.types.chat import ChatCompletionMessageParam, ChatCompletionToolParam
from unittest.mock import MagicMock

class SystemMessage(TypedDict):
    role: Literal["system"]
    content: str

class UserMessage(TypedDict):
    role: Literal["user"]
    content: str

class AssistantMessage(TypedDict):
    role: Literal["assistant"]
    content: str

class MockToolCall:
    def __init__(self, function_name: str):
        self.function = type('Function', (), {'name': function_name})()
        self.type = "function"
        self.id = "mock_tool_call"

class MockMessage:
    def __init__(self, content: str, tool_calls: Optional[List[MockToolCall]] = None):
        self.content = content
        self.role = "assistant"
        self.tool_calls = tool_calls

class MockChoice:
    def __init__(self, content: str, tool_calls: Optional[List[MockToolCall]] = None):
        self.message = MockMessage(content, tool_calls)
        self.finish_reason = "stop"
        self.index = 0

class MockCompletion:
    def __init__(self, content: str, tool_calls: Optional[List[MockToolCall]] = None):
        self.id = "mock_id"
        self.choices = [MockChoice(content, tool_calls)]
        self.created = 1234567890
        self.model = "gpt-4"
        self.object = "chat.completion"

class MockOpenAIClient:
    def __init__(self):
        self.chat = MagicMock()
        self.chat.completions = self
        self._agent_type = "general"

    @property
    def agent_type(self) -> str:
        return self._agent_type

    @agent_type.setter
    def agent_type(self, value: str) -> None:
        self._agent_type = value

    def create(self, messages: List[ChatCompletionMessageParam], tools: Optional[List[ChatCompletionToolParam]] = None, **kwargs) -> MockCompletion:
        # Use the agent type that was set
        agent_type = self.agent_type

        # Generate appropriate mock response based on agent type
        responses = {
            "billing": "This is a mock billing department response. I can help you with invoices and payments.",
            "technical": "This is a mock technical support response. Let me help you troubleshoot your issue.",
            "orders": "This is a mock orders department response. I can help you track your order.",
            "hardware": "This is a mock hardware support response. I can help you with hardware-specific issues.",
            "software": "This is a mock software support response. I can help you with software-specific issues.",
            "general": "This is a mock customer service response. How can I assist you today?"
        }

        # Randomly decide whether to transfer (20% chance)
        should_transfer = tools and len(tools) > 0 and random.random() < 0.2
        if should_transfer and tools:
            tool_call = MockToolCall(tools[0]["function"]["name"])
            return MockCompletion(responses.get(agent_type, responses["general"]), [tool_call])
        
        return MockCompletion(responses.get(agent_type, responses["general"]))

# Initialize the OpenAI client (with mock for testing if no API key available)
api_key = os.getenv("OPENAI_API_KEY")
print("Initializing OpenAI client with API key")
client = OpenAI(api_key=api_key) if api_key else MockOpenAIClient()

# Pydantic models for API
class Message(BaseModel):
    role: Literal["system", "user", "assistant", "function"]
    content: str
    name: Optional[str] = None
    function_call: Optional[Dict[str, Any]] = None

class ChatRequest(BaseModel):
    query: str
    conversation_history: List[Message] = []
    agent_type: str

class ChatResponse(BaseModel):
    response: str
    conversation_history: List[Message]
    transfer_to: Optional[str] = None

# Function to get transfer tools based on agent type
def get_transfer_tools(agent_type: str) -> List[ChatCompletionToolParam]:
    """Get transfer tools based on agent type."""
    all_tools: List[ChatCompletionToolParam] = [
        {
            "type": "function",
            "function": {
                "name": "transfer_to_customer_service",
                "description": "Transfer back to the main customer service agent",
            },
        },
        {
            "type": "function",
            "function": {
                "name": "transfer_to_billing",
                "description": "Transfer to billing department for billing-related issues",
            },
        },
        {
            "type": "function",
            "function": {
                "name": "transfer_to_orders",
                "description": "Transfer to orders department for order-related issues",
            },
        },
        {
            "type": "function",
            "function": {
                "name": "transfer_to_technical",
                "description": "Transfer to technical support for technical issues",
            },
        },
    ]
    
    if agent_type == "technical":
        all_tools.extend([
            {
                "type": "function",
                "function": {
                    "name": "transfer_to_hardware",
                    "description": "Transfer to hardware support for hardware-specific issues",
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "transfer_to_software",
                    "description": "Transfer to software support for software-specific issues",
                },
            },
        ])
    
    return [tool for tool in all_tools if tool["function"]["name"] != f"transfer_to_{agent_type}"]

def handle_response(response: Any, conversation_history: List[Message]) -> ChatResponse:
    """Handle response from OpenAI API."""
    if response.choices[0].message.tool_calls:
        tool_call = response.choices[0].message.tool_calls[0]
        function_name = tool_call.function.name
        transfer_to = function_name.split('_')[-1]
        content = response.choices[0].message.content or "Transferring to another department..."
        
        transfer_message = f"{content}\n[Transferring to {transfer_to.capitalize()}]"
        conversation_history.append(Message(role="assistant", content=transfer_message))
        
        return ChatResponse(
            response=transfer_message,
            conversation_history=conversation_history,
            transfer_to=transfer_to
        )
    else:
        content = response.choices[0].message.content
        conversation_history.append(Message(role="assistant", content=content))
        
        return ChatResponse(
            response=content,
            conversation_history=conversation_history
        )

def customer_service_agent(query: str, conversation_history: List[Message]) -> ChatResponse:
    """Main customer service agent that handles initial queries and transfers."""
    if isinstance(client, MockOpenAIClient):
        client.agent_type = "customer_service"
    system_message = """You are a friendly and efficient customer service agent. Your role is to:
    1. Greet the customer and understand their query.
    2. Handle general inquiries.
    3. Transfer to specialized departments (Billing, Orders, Technical Support) when necessary.
    4. Summarize the conversation when it ends.
    Always maintain a polite and helpful demeanor."""

    tools = get_transfer_tools("customer_service")
    messages: List[ChatCompletionMessageParam] = [
        cast(ChatCompletionMessageParam, {"role": "system", "content": system_message}),
        *[cast(ChatCompletionMessageParam, {"role": msg.role, "content": msg.content}) for msg in conversation_history],
        cast(ChatCompletionMessageParam, {"role": "user", "content": query})
    ]
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )
    
    return handle_response(response, conversation_history)

def billing_agent(query: str, conversation_history: List[Message]) -> ChatResponse:
    """Billing department agent."""
    if isinstance(client, MockOpenAIClient):
        client.agent_type = "billing"
    system_message = """You are a knowledgeable billing department agent. Your responsibilities include:
    1. Handling all billing-related queries.
    2. Explaining charges, fees, and invoices.
    3. Processing refunds or adjustments when appropriate.
    4. Providing information about payment methods and billing cycles.
    5. Transferring to other departments when necessary.
    Be precise with financial information and always verify details before making changes."""

    tools = get_transfer_tools("billing")
    messages: List[ChatCompletionMessageParam] = [
        cast(ChatCompletionMessageParam, {"role": "system", "content": system_message}),
        *[cast(ChatCompletionMessageParam, {"role": msg.role, "content": msg.content}) for msg in conversation_history],
        cast(ChatCompletionMessageParam, {"role": "user", "content": f"Billing query: {query}"})
    ]
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )
    
    return handle_response(response, conversation_history)

def orders_agent(query: str, conversation_history: List[Message]) -> ChatResponse:
    """Orders department agent."""
    if isinstance(client, MockOpenAIClient):
        client.agent_type = "orders"
    system_message = """You are a detail-oriented orders department agent. Your duties include:
    1. Tracking order status and providing updates.
    2. Handling order modifications or cancellations.
    3. Assisting with product availability and shipping inquiries.
    4. Resolving order-related issues promptly.
    5. Transferring to other departments when necessary.
    Ensure accuracy in order details and always confirm changes with the customer."""

    tools = get_transfer_tools("orders")
    messages: List[ChatCompletionMessageParam] = [
        cast(ChatCompletionMessageParam, {"role": "system", "content": system_message}),
        *[cast(ChatCompletionMessageParam, {"role": msg.role, "content": msg.content}) for msg in conversation_history],
        cast(ChatCompletionMessageParam, {"role": "user", "content": f"Order query: {query}"})
    ]
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )
    
    return handle_response(response, conversation_history)

def technical_support_agent(query: str, conversation_history: List[Message]) -> ChatResponse:
    """Technical support agent that can transfer to hardware or software."""
    if isinstance(client, MockOpenAIClient):
        client.agent_type = "technical"
    system_message = """You are a skilled technical support agent. Your responsibilities include:
    1. Diagnosing general technical issues.
    2. Providing basic troubleshooting steps.
    3. Determining if an issue is hardware or software related.
    4. Transferring to specialized hardware or software support when necessary.
    5. Transferring to other departments when needed.
    Be patient in explaining technical concepts and guide users through troubleshooting steps carefully."""

    tools = get_transfer_tools("technical")
    messages: List[ChatCompletionMessageParam] = [
        cast(ChatCompletionMessageParam, {"role": "system", "content": system_message}),
        *[cast(ChatCompletionMessageParam, {"role": msg.role, "content": msg.content}) for msg in conversation_history],
        cast(ChatCompletionMessageParam, {"role": "user", "content": f"Technical query: {query}"})
    ]
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )
    
    return handle_response(response, conversation_history)

def hardware_support_agent(query: str, conversation_history: List[Message]) -> ChatResponse: 
    """Hardware support specialist."""
    if isinstance(client, MockOpenAIClient):
        client.agent_type = "hardware"
    system_message = """You are an expert hardware support specialist. Your role involves:
    1. Diagnosing complex hardware issues.
    2. Providing detailed troubleshooting steps for hardware problems.
    3. Advising on hardware maintenance and upgrades.
    4. Determining when a device needs physical inspection or repair.
    5. Transferring to other departments when necessary.
    Use technical terms when necessary, but be prepared to explain them in simpler terms if asked."""

    tools = get_transfer_tools("hardware")
    messages: List[ChatCompletionMessageParam] = [
        cast(ChatCompletionMessageParam, {"role": "system", "content": system_message}),
        *[cast(ChatCompletionMessageParam, {"role": msg.role, "content": msg.content}) for msg in conversation_history],
        cast(ChatCompletionMessageParam, {"role": "user", "content": f"Hardware query: {query}"})
    ]
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )
    
    return handle_response(response, conversation_history)

def software_support_agent(query: str, conversation_history: List[Message]) -> ChatResponse:
    """Software support specialist."""
    if isinstance(client, MockOpenAIClient):
        client.agent_type = "software"
    system_message = """You are a proficient software support specialist. Your responsibilities include:
    1. Troubleshooting software-related issues.
    2. Guiding users through software installation and updates.
    3. Explaining software features and functionality.
    4. Providing workarounds for known software bugs.
    5. Transferring to other departments when necessary.
    Be clear and concise in your instructions, and always consider the user's technical proficiency level."""

    tools = get_transfer_tools("software")
    messages: List[ChatCompletionMessageParam] = [
        cast(ChatCompletionMessageParam, {"role": "system", "content": system_message}),
        *[cast(ChatCompletionMessageParam, {"role": msg.role, "content": msg.content}) for msg in conversation_history],
        cast(ChatCompletionMessageParam, {"role": "user", "content": f"Software query: {query}"})
    ]
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )
    
    return handle_response(response, conversation_history)
