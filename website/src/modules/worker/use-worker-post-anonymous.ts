import useSWRMutation from 'swr/mutation';
import { WORKER_URL } from '@/core/config';

export function useWorkerPostAnonymous<T>(key: string) {
  const fetcher = async (key: string, { arg }: { arg: T }) => {
    const res = await fetch(`${WORKER_URL}${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    });
    if (!res.ok) {
      throw new Error('Error while performing post');
    }
    return res.json();
  };

  const { trigger, data, error, isMutating } = useSWRMutation(key, fetcher);

  return { trigger, data, error, isMutating };
}
