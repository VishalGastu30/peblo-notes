import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OptimisticAction<T> {
  apiCall: () => Promise<T>;
  onOptimistic: () => void;
  onRevert: () => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useOptimisticAction() {
  const { toast } = useToast();

  const execute = useCallback(async <T>({
    apiCall,
    onOptimistic,
    onRevert,
    successMessage,
    errorMessage = 'Action failed. Changes reverted.',
  }: OptimisticAction<T>): Promise<T | null> => {
    // Apply optimistic update immediately
    onOptimistic();

    try {
      const result = await apiCall();
      if (successMessage) {
        toast({ title: successMessage });
      }
      return result;
    } catch (error) {
      // Revert on failure
      onRevert();
      toast({ title: errorMessage, variant: 'destructive' });
      return null;
    }
  }, [toast]);

  return { execute };
}
