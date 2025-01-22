import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface AgentCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  status: "active" | "idle";
  isSelected?: boolean;
  onClick?: () => void;
}

export function AgentCard({ 
  name, 
  role, 
  avatarUrl, 
  status,
  isSelected = false,
  onClick 
}: AgentCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-4 rounded-md",
        "transition-all duration-200 ease-in-out",
        "hover:bg-zinc-800/50",
        "focus:outline-none focus:ring-2 focus:ring-orange-500/50",
        "text-left",
        isSelected && "bg-zinc-800/80 shadow-lg"
      )}
    >
      <Avatar className={cn(
        "border-2",
        status === "active" ? "border-green-500" : "border-zinc-600",
        isSelected && "border-orange-500"
      )}>
        <AvatarImage src={avatarUrl} alt={`${name} avatar`} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col min-w-0">
        <span className={cn(
          "font-medium truncate",
          isSelected ? "text-orange-500" : "text-zinc-100"
        )}>
          {name}
        </span>
        <span className="text-xs text-zinc-400 truncate">
          {role}
        </span>
      </div>
      
      <div className={cn(
        "ml-auto text-xs",
        status === "active" ? "text-green-400" : "text-zinc-500"
      )}>
        {status === "active" ? "online" : "away"}
      </div>
    </button>
  );
}
