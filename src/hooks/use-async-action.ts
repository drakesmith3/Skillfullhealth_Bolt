
import { useState } from 'react';

export function useAsyncAction<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (
    asyncFn: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: any) => void
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await asyncFn();
      setData(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      if (onError) onError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error, data };
}

export default useAsyncAction;
