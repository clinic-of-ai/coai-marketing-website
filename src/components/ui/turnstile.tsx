'use client';

import { useEffect, useRef, useState } from 'react';

export type TurnstileProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  action?: string;
  className?: string;
};

export function Turnstile({
  siteKey,
  onVerify,
  onError,
  onExpire,
  action,
  className = '',
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  useEffect(() => {
    // Load the Turnstile script if it hasn't been loaded yet
    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      
      script.onload = () => setLoaded(true);
      script.onerror = () => onError?.();
      
      document.head.appendChild(script);
      
      return () => {
        // Cleanup script on component unmount
        try {
          const scriptEl = document.querySelector('script[src*="turnstile"]');
          if (scriptEl && scriptEl.parentNode) {
            scriptEl.parentNode.removeChild(scriptEl);
          }
        } catch (e) {
          console.error('Error removing Turnstile script:', e);
        }
      };
    } else {
      setLoaded(true);
    }
  }, [onError]);

  useEffect(() => {
    // Render the widget when the script is loaded
    if (loaded && containerRef.current && !widgetId && window.turnstile) {
      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
          'error-callback': () => {
            onError?.();
          },
          'expired-callback': () => {
            onExpire?.();
          },
          theme: 'light',
          action: action || undefined,
        });
        
        setWidgetId(id);
      } catch (error) {
        console.error('Error rendering Turnstile widget:', error);
        onError?.();
      }
    }
    
    return () => {
      // Reset the widget on unmount
      if (widgetId && window.turnstile) {
        window.turnstile.reset(widgetId);
      }
    };
  }, [loaded, siteKey, onVerify, onError, onExpire, widgetId, action]);

  // Function to reset the widget
  const reset = () => {
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  };

  return <div ref={containerRef} className={className}></div>;
}

// Add TypeScript type definitions for the Turnstile global variable
declare global {
  interface Window {
    turnstile: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          action?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
} 