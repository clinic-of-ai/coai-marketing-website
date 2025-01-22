import { useState, useEffect, useRef } from 'react';
import messageSentSound from '../../assets/sounds/message-sent.mp3';
import karmaUpSound from '../../assets/sounds/karma-up.mp3';
import { useKarma } from '../../contexts/KarmaContext';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { cn } from '../../lib/utils';
import type { Agent } from '../agents/AgentList';
import { useLottie } from 'lottie-react';
import typingAnimation from '../../assets/lottie/typing-indicator.json';
import welcomeAnimation from '../../assets/lottie/welcome.json';
import messageSentAnimation from '../../assets/lottie/message-sent.json';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatInterfaceProps {
  activeAgent?: Agent;
}

export function ChatInterface({ activeAgent }: ChatInterfaceProps) {
  const messageSentAudio = useRef(new Audio(messageSentSound));
  const karmaUpAudio = useRef(new Audio(karmaUpSound));
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [showWelcome, setShowWelcome] = useState(true);
  const [showMessageSent, setShowMessageSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { incrementKarma } = useKarma();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const wsRef = useRef<WebSocket | null>(null);
  const [wsConnected, setWsConnected] = useState(false);

  const { View: TypingAnimation } = useLottie({
    animationData: typingAnimation,
    loop: true,
    autoplay: true,
    style: { width: 60, height: 30 }
  });

  const { View: WelcomeAnimation } = useLottie({
    animationData: welcomeAnimation,
    loop: false,
    autoplay: true,
    style: { width: 200, height: 200 },
    onComplete: () => setShowWelcome(false)
  });

  const { View: MessageSentAnimation } = useLottie({
    animationData: messageSentAnimation,
    loop: false,
    autoplay: true,
    style: { width: 40, height: 40 },
    onComplete: () => setShowMessageSent(false)
  });

  const { View: ErrorAnimation } = useLottie({
    animationData: welcomeAnimation, // Reuse Snoo animation for error state
    loop: false,
    autoplay: true,
    style: { width: 120, height: 120 }
  });

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!activeAgent) return;

    const wsUrl = import.meta.env.VITE_WS_URL;
    console.log('Connecting to WebSocket:', wsUrl);
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const agentMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
      incrementKarma(2);
      setLoadingStates(prev => {
        const newStates = { ...prev };
        // Clear any loading states as we received a response
        Object.keys(newStates).forEach(key => delete newStates[key]);
        return newStates;
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setWsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [activeAgent]);

  const smoothScrollToBottom = () => {
    if (!chatContainerRef.current) return;
    
    const startPosition = chatContainerRef.current.scrollTop;
    const targetPosition = chatContainerRef.current.scrollHeight;
    const distance = targetPosition - startPosition;
    const duration = 300;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (chatContainerRef.current) {
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        chatContainerRef.current.scrollTop = 
          startPosition + (distance * easeOutCubic);
        
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    smoothScrollToBottom();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !wsRef.current || !wsConnected || !activeAgent) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);
    // Increment karma for being social
    incrementKarma(1);
    if (soundEnabled) {
      karmaUpAudio.current.play().catch(() => {});
    }

    // Set loading state for this message
    const messageId = newMessage.id;
    setLoadingStates(prev => ({ ...prev, [messageId]: true }));
    
    try {
      wsRef.current.send(JSON.stringify({ 
        message: input,
        agentId: activeAgent.id,
        agentName: activeAgent.name,
        agentRole: activeAgent.role
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setShowError(true);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Oops! My snacks got stuck in the server! 🍪 Give me a moment to grab them and try again. (Reddit servers are being Reddit-y)',
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setTimeout(() => setShowError(false), 3000);
      setIsTyping(false);
      setLoadingStates(prev => {
        const newStates = { ...prev };
        delete newStates[messageId];
        return newStates;
      });
    }
  };

  return (
    <Card className="flex flex-col bg-card">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-[#ff4500]">Supra</span>Support
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {activeAgent ? `Chatting with ${activeAgent.name}` : 'Select an agent to begin'}
          </span>
        </h2>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 min-h-96 max-h-96"
      >
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-center items-center"
            >
              {WelcomeAnimation}
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 50 }}
            >
              {ErrorAnimation}
            </motion.div>
          )}
        </AnimatePresence>
        
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className={cn(
              "flex gap-3 pl-4",
              message.sender === 'user' ? "flex-row-reverse" : "flex-row"
            )}
            whileHover={{ 
              scale: 1.01,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            style={{
              transformOrigin: message.sender === 'user' ? 'right' : 'left'
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
            >
              <Avatar className="flex-shrink-0">
                <AvatarFallback className={cn(
                  message.sender === 'user' ? "bg-primary" : "bg-secondary"
                )}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : activeAgent ? (
                    <img 
                      src={activeAgent.avatarUrl} 
                      alt={activeAgent.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className={cn(
                "rounded-lg p-3 max-w-md text-sm relative group transition-all duration-200",
                "hover:shadow-lg dark:hover:shadow-zinc-900/50",
                "border border-transparent hover:border-border/40",
                message.sender === 'user' 
                  ? "bg-primary text-primary-foreground ml-auto hover:bg-primary/90" 
                  : "bg-muted hover:bg-muted/90"
              )}>
              <div className="absolute -left-16 top-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 hover:bg-accent rounded-full"
                  onClick={() => incrementKarma(1)}
                >
                  <span className="text-xs">⬆️</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 hover:bg-accent rounded-full"
                >
                  <span className="text-xs">⬇️</span>
                </motion.button>
              </div>
              <span className="absolute top-1 right-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200">
                {message.timestamp.toLocaleTimeString()}
              </span
            >
              {loadingStates[message.id] ? (
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  className="space-y-2"
                >
                  <div className="h-2 bg-muted-foreground/20 rounded-full w-3/4" />
                  <div className="h-2 bg-muted-foreground/20 rounded-full w-1/2" />
                </motion.div>
              ) : (
                message.content
              )}
            </motion.div>
          </motion.div>
        ))}
        
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center gap-2 p-2 ml-12 rounded-lg bg-muted/50 dark:bg-zinc-800/50 max-w-[200px]"
            >
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-secondary">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                {TypingAnimation}
                <span className="text-xs text-muted-foreground">Snoo is thinking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-full hover:bg-accent"
        >
          {soundEnabled ? "🔊" : "🔇"}
        </motion.button>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setShowMessageSent(true);
    if (soundEnabled) {
      messageSentAudio.current.play().catch(() => {});
    }
            await handleSend();
            setTimeout(() => setShowMessageSent(false), 1500);
          }}
          className="flex gap-2 items-center"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={activeAgent 
              ? `Message ${activeAgent.name} (${activeAgent.role})...` 
              : "Select an agent to start chatting..."}
            disabled={!activeAgent}
            className="flex-1 input-focus"
          />
          <AnimatePresence>
            {showMessageSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-20"
              >
                {MessageSentAnimation}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="relative overflow-hidden button-hover"
            >
              <motion.div
                animate={isTyping ? { opacity: 0.5 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </form>
      </div>
    </Card>
  );
}
