
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAsyncActionOptions<T> {
  action: (...args: any[]) => Promise<T>;
  onSuccess?: (result: T) => void;
  successMessage?: string;
  onError?: (error: any) => void;
  errorMessage?: string;
}

export function useAsyncAction<T = any>({
  action,
  onSuccess,
  successMessage,
  onError,
  errorMessage
}: UseAsyncActionOptions<T>) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<T | null>(null);

  const execute = async (...args: any[]): Promise<T> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await action(...args);
      setResult(result);
      
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setError(err);
      
      if (errorMessage) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute,
    isLoading,
    error,
    result
  };
}
