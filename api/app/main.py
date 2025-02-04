from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from starlette.websockets import WebSocketState
from typing import Dict, List
import os
import json
from dotenv import load_dotenv
from app.agents import (
    customer_service_agent, billing_agent, orders_agent,
    technical_support_agent, hardware_support_agent,
    software_support_agent, ChatRequest, ChatResponse, Message
)

# Load environment variables
load_dotenv()

# Load environment variables
load_dotenv()

# Check for OpenAI API key and warn if not set
if not os.getenv("OPENAI_API_KEY"):
    print("Warning: OPENAI_API_KEY environment variable is not set. Using mock responses for testing.")

app = FastAPI(title="SupraSupport API", description="AI-powered customer service system")

# Configure CORS middleware at the very beginning
origins = ["*"]  # Allow all origins during testing

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods during testing
    allow_headers=[
        "Accept",
        "Accept-Encoding",
        "Authorization",
        "Content-Type",
        "Origin",
        "Sec-WebSocket-Accept",
        "Sec-WebSocket-Extensions",
        "Sec-WebSocket-Key",
        "Sec-WebSocket-Protocol",
        "Sec-WebSocket-Version",
        "User-Agent",
        "X-Requested-With"
    ],
    expose_headers=["*"]
)

# Connection manager for WebSocket clients
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        try:
            print("Adding WebSocket connection to active connections")
            self.active_connections.append(websocket)
            print("WebSocket connection added successfully")
        except Exception as e:
            print(f"Error adding WebSocket connection: {str(e)}")
            raise

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print("WebSocket connection removed")

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

manager = ConnectionManager()

# Handle preflight requests for WebSocket
from fastapi.responses import Response

@app.options("/ws")
async def websocket_options():
    """Handle preflight requests for WebSocket connections."""
    return Response(
        status_code=200,
        headers={
            "Allow": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*"
        }
    )

@app.head("/ws")
async def websocket_head():
    """Handle HEAD requests for WebSocket endpoint."""
    return Response(
        status_code=200,
        headers={
            "Upgrade": "websocket",
            "Connection": "Upgrade",
            "Sec-WebSocket-Version": "13"
        }
    )

@app.get("/ws")
async def websocket_get():
    """Handle GET requests to WebSocket endpoint."""
    return Response(
        status_code=426,
        headers={
            "Upgrade": "websocket",
            "Connection": "Upgrade",
            "Sec-WebSocket-Version": "13"
        }
    )

# Register WebSocket routes
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time chat."""
    print("WebSocket connection request received")
    
    # Log detailed connection information
    print("=== WebSocket Connection Details ===")
    print("All Headers:", {k: v for k, v in websocket.headers.items()})
    print("Query Params:", websocket.query_params)
    print("=== WebSocket Upgrade Headers ===")
    print("Connection:", websocket.headers.get("connection"))
    print("Upgrade:", websocket.headers.get("upgrade"))
    print("Sec-WebSocket-Key:", websocket.headers.get("sec-websocket-key"))
    print("Sec-WebSocket-Version:", websocket.headers.get("sec-websocket-version"))
    print("Sec-WebSocket-Protocol:", websocket.headers.get("sec-websocket-protocol"))
    print("Sec-WebSocket-Extensions:", websocket.headers.get("sec-websocket-extensions"))
    
    try:
        # Accept the WebSocket connection without headers
        # Accept the WebSocket connection
        await websocket.accept()
        print("WebSocket connection accepted")
        
        # Add to connection manager
        await manager.connect(websocket)
        print("WebSocket connection established")
        
        while True:
            try: 
                data = await websocket.receive_text()
                print(f"Received message: {data}")
                request_data = json.loads(data)
                chat_request = ChatRequest(**request_data)
                
                if chat_request.agent_type not in AGENT_MAP:
                    error_msg = {"error": f"Invalid agent type. Must be one of: {', '.join(AGENT_MAP.keys())}"}
                    print(f"Invalid agent type error: {error_msg}")
                    await websocket.send_text(json.dumps(error_msg))
                    continue
                
                agent_func = AGENT_MAP[chat_request.agent_type]
                response = agent_func(chat_request.query, chat_request.conversation_history)
                await websocket.send_text(json.dumps(response.dict()))
                print(f"Sent response for agent {chat_request.agent_type}")
                
            except json.JSONDecodeError as e:
                error_msg = {"error": "Invalid JSON data"}
                print(f"JSON decode error: {str(e)}")
                await websocket.send_text(json.dumps(error_msg))
            except WebSocketDisconnect:
                print("WebSocket disconnected")
                break
            except Exception as e:
                error_msg = {"error": str(e)}
                print(f"Unexpected error: {str(e)}")
                await websocket.send_text(json.dumps(error_msg))
                
    except WebSocketDisconnect:
        print("WebSocket disconnected during setup")
    except Exception as e:
        print(f"Connection error: {str(e)}")
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close(code=1000)
    finally:
        print("Cleaning up WebSocket connection")
        manager.disconnect(websocket)

# Agent mapping
AGENT_MAP = {
    "customer_service": customer_service_agent,
    "billing": billing_agent,
    "orders": orders_agent,
    "technical": technical_support_agent,
    "hardware": hardware_support_agent,
    "software": software_support_agent
}

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/api/agents")
async def list_agents():
    """List all available agent types and their descriptions."""
    agents = []
    for agent_type in AGENT_MAP.keys():
        agent_info = {
            "id": agent_type,
            "name": agent_type.replace("_", " ").title(),
            "role": agent_type.replace("_", " ").title(),
            "description": f"Specialized in {agent_type.replace('_', ' ')} related queries"
        }
        agents.append(agent_info)
    return {"agents": agents}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with an AI agent.
    
    - agent_type: The type of agent to chat with (customer_service, billing, orders, technical, hardware, software)
    - query: The user's message
    - conversation_history: List of previous messages in the conversation
    """
    if request.agent_type not in AGENT_MAP:
        raise HTTPException(status_code=400, detail=f"Invalid agent type. Must be one of: {', '.join(AGENT_MAP.keys())}")
    
    agent_func = AGENT_MAP[request.agent_type]
    return agent_func(request.query, request.conversation_history)
