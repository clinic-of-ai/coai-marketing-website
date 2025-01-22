import React from "react";
import { AgentCard } from "./AgentCard";
import { cn } from "@/lib/utils";

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  status: "active" | "idle";
}

const mockAgents: Agent[] = [
  { 
    id: "1", 
    name: "Mike", 
    role: "Team Leader", 
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=mike", 
    status: "active" 
  },
  { 
    id: "2", 
    name: "Alice", 
    role: "Product Manager", 
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=alice", 
    status: "active" 
  },
  { 
    id: "3", 
    name: "Bob", 
    role: "Architect", 
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=bob", 
    status: "idle" 
  },
  { 
    id: "4", 
    name: "Eve", 
    role: "Project Manager", 
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=eve", 
    status: "idle" 
  },
  { 
    id: "5", 
    name: "Alex", 
    role: "Engineer", 
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=alex", 
    status: "active" 
  }
];

interface AgentListProps {
  className?: string;
  onAgentSelect?: (agent: Agent) => void;
  selectedAgentId?: string;
}

export function AgentList({ 
  className,
  onAgentSelect,
  selectedAgentId 
}: AgentListProps) {
  return (
    <div className={cn(
      "flex flex-col w-64 bg-[#1A1A1B] border-r border-zinc-800/40 p-4 gap-2",
      "overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent",
      className
    )}>
      <h2 className="text-sm font-medium text-zinc-400 px-4 mb-2">
        Available Agents
      </h2>
      
      {mockAgents.map(agent => (
        <AgentCard
          key={agent.id}
          name={agent.name}
          role={agent.role}
          avatarUrl={agent.avatarUrl}
          status={agent.status}
          isSelected={agent.id === selectedAgentId}
          onClick={() => onAgentSelect?.(agent)}
        />
      ))}
    </div>
  );
}
