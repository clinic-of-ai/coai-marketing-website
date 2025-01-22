import { ChatInterface } from './components/chat/ChatInterface';
import { Sidebar } from './components/ui/Sidebar';
import { AgentList } from './components/agents/AgentList';
import { KarmaProvider } from './contexts/KarmaContext';
import { useState } from 'react';
import type { Agent } from './components/agents/AgentList';

function App() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>(undefined);

  return (
    <KarmaProvider>
      <div className="flex min-h-screen bg-[#1A1A1B] text-zinc-100">
        <Sidebar />
        <AgentList 
          className="border-r border-zinc-800/40"
          selectedAgentId={selectedAgent?.id}
          onAgentSelect={setSelectedAgent}
        />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              SupraSupport Chat
            </h1>
            <ChatInterface activeAgent={selectedAgent} />
          </div>
        </main>
      </div>
    </KarmaProvider>
  );
}

export default App;
