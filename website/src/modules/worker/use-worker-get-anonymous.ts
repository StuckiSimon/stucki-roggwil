import useSWR from 'swr';
import { WORKER_URL } from '@/core/config';

export function useWorkerGetAnonymous<T>(key: string | null) {
  const fetcher = async (url: string): Promise<T> => {
    const res = await fetch(`${WORKER_URL}${url}`, {
      method: 'GET',
    });
    if (!res.ok) {
      throw new Error('Error while performing get');
    }
    return res.json();
  };

  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher);

  return { data, error, isLoading, mutate };
}
