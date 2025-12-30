import useSWRMutation from 'swr/mutation';
import { WORKER_URL } from '@/core/config';
import { useAdminPassword } from '@/modules/admin-layout/useAdminPassword';
import { AUTH_USERNAME } from '@/modules/worker/constants';

export function useWorkerPost<T>(key: string) {
  const { adminPassword } = useAdminPassword();

  const fetcher = async (key: string, { arg }: { arg: T }) => {
    const encodedAuth = Buffer.from(`${AUTH_USERNAME}:${adminPassword}`).toString('base64');

    const res = await fetch(`${WORKER_URL}${key}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedAuth}`,
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
