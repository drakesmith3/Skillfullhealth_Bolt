
import { useState, useCallback } from 'react';

export type ToastVariant = "default" | "destructive";

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open: boolean;
  variant?: ToastVariant;
};

export type ToastOptions = Omit<ToastProps, 'id' | 'open'>;

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...options, id, open: true };
    
    setToasts((prev) => [...prev, newToast]);
    
    return {
      id,
      dismiss: () => {
        setToasts((prev) => 
          prev.map((t) => (t.id === id ? { ...t, open: false } : t))
        );
        
        // Remove from state after animation completes
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300);
      },
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => 
      prev.map((t) => (t.id === id ? { ...t, open: false } : t))
    );
    
    // Remove from state after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  return {
    toast,
    dismiss,
    toasts
  };
}

// Singleton implementation for direct imports
let toasts: ToastProps[] = [];
let listeners: Array<() => void> = [];

const notify = () => {
  listeners.forEach((listener) => {
    listener();
  });
};

export const toast = (options: ToastOptions) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast = { ...options, id, open: true };
  
  toasts = [...toasts, newToast];
  notify();
  
  return {
    id,
    dismiss: () => {
      toasts = toasts.map((t) => (t.id === id ? { ...t, open: false } : t));
      notify();
      
      // Remove from state after animation completes
      setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id);
        notify();
      }, 300);
    },
  };
};

// Used by the Toaster component
export const getToasts = () => toasts;

export const addToastListener = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
