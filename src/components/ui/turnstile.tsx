'use client';

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';

export type TurnstileProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  action?: string;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
};

export type TurnstileHandle = {
  reset: () => void;
};

// Global script loading tracking to avoid duplicate script loading
let isScriptLoading = false;
let isScriptLoaded = false;
const scriptCallbacks: Array<(success: boolean) => void> = [];

// Load the script once for all instances
function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded) {
      resolve();
      return;
    }

    if (isScriptLoading) {
      scriptCallbacks.push((success) => success ? resolve() : reject(new Error('Failed to load Turnstile script')));
      return;
    }

    isScriptLoading = true;
    const script = document.createElement('script');
    script.id = 'cf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      resolve();
      
      // Call all pending callbacks
      scriptCallbacks.forEach(callback => callback(true));
      scriptCallbacks.length = 0;
    };
    
    script.onerror = (e) => {
      isScriptLoading = false;
      reject(e);
      
      // Call all pending callbacks with error
      scriptCallbacks.forEach(callback => callback(false));
      scriptCallbacks.length = 0;
    };
    
    document.head.appendChild(script);
  });
}

export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  function Turnstile({
    siteKey,
    onVerify,
    onError,
    onExpire,
    action,
    className = '',
    theme = 'light'
  }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [widgetId, setWidgetId] = useState<string | null>(null);
    const callbacksRef = useRef({ onVerify, onError, onExpire });

    // Keep callbacks up-to-date without triggering effect reruns
    useEffect(() => {
      callbacksRef.current = { onVerify, onError, onExpire };
    }, [onVerify, onError, onExpire]);

    // Reset the widget
    const reset = useCallback(() => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.reset(widgetId);
        } catch (e) {
          console.error('Error resetting Turnstile widget:', e);
          callbacksRef.current.onError?.();
        }
      }
    }, [widgetId]);

    // Expose the reset method to the parent component
    useImperativeHandle(ref, () => ({
      reset
    }), [reset]);

    useEffect(() => {
      let mounted = true;
      
      const initializeTurnstile = async () => {
        try {
          await loadTurnstileScript();
          
          if (!mounted || !containerRef.current || !window.turnstile) return;
          
          // Clean up any existing widget
          if (widgetId) {
            try {
              window.turnstile.reset(widgetId);
            } catch (e) {
              console.error('Error resetting Turnstile widget:', e);
            }
          }
          
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              callbacksRef.current.onVerify(token);
            },
            'error-callback': () => {
              callbacksRef.current.onError?.();
            },
            'expired-callback': () => {
              callbacksRef.current.onExpire?.();
            },
            theme,
            action: action || undefined,
          });
          
          if (mounted) {
            setWidgetId(id);
          }
        } catch (error) {
          console.error('Error rendering Turnstile widget:', error);
          if (mounted) {
            callbacksRef.current.onError?.();
          }
        }
      };

      initializeTurnstile();
      
      return () => {
        mounted = false;
        
        // Clean up the widget on unmount
        if (widgetId && window.turnstile) {
          try {
            window.turnstile.reset(widgetId);
          } catch (e) {
            console.error('Error cleaning up Turnstile widget:', e);
          }
        }
      };
    }, [siteKey, theme, action, widgetId]);

    return <div ref={containerRef} className={className}></div>;
  }
);

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