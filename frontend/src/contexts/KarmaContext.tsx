import React, { createContext, useContext, useState, useCallback } from 'react';

interface KarmaContextType {
  karmaPoints: number;
  incrementKarma: (amount?: number) => void;
  decrementKarma: (amount?: number) => void;
  showKarmaAnimation: boolean;
}

const KarmaContext = createContext<KarmaContextType | undefined>(undefined);

export function KarmaProvider({ children }: { children: React.ReactNode }) {
  const [karmaPoints, setKarmaPoints] = useState(1);
  const [showKarmaAnimation, setShowKarmaAnimation] = useState(false);

  const incrementKarma = useCallback((amount = 1) => {
    setKarmaPoints(prev => prev + amount);
    setShowKarmaAnimation(true);
    setTimeout(() => setShowKarmaAnimation(false), 1000);
  }, []);

  const decrementKarma = useCallback((amount = 1) => {
    setKarmaPoints(prev => Math.max(0, prev - amount));
  }, []);

  return (
    <KarmaContext.Provider value={{ karmaPoints, incrementKarma, decrementKarma, showKarmaAnimation }}>
      {children}
    </KarmaContext.Provider>
  );
}

export function useKarma() {
  const context = useContext(KarmaContext);
  if (context === undefined) {
    throw new Error('useKarma must be used within a KarmaProvider');
  }
  return context;
}
