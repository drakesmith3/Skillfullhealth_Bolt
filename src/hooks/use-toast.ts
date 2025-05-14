import { useState, useCallback } from 'react';

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open: boolean;
};

type ToastOptions = Omit<ToastProps, 'id' | 'open'>;

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

export const toast = (options: ToastOptions) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast = { ...options, id, open: true };

  // Logic to handle toast creation
};
