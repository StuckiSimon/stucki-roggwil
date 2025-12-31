import useSWR from 'swr';
import { WORKER_URL } from '@/core/config';
import { useAdminPassword } from '@/modules/admin-layout/useAdminPassword';
import { createWorkerAuthHeader } from '@/modules/worker/create-worker-auth-header';
import isNil from '@/core/util/is-nil';

export function useWorkerGet<T>(key: string | null) {
  const { adminPassword } = useAdminPassword();

  const swrKey = isNil(key) || isNil(adminPassword) ? null : [key, adminPassword];

  const fetcher = async ([url, password]: [string, string]): Promise<T> => {
    const headers = createWorkerAuthHeader(password);
    const res = await fetch(`${WORKER_URL}${url}`, {
      method: 'GET',
      headers,
    });
    if (!res.ok) {
      throw new Error('Error while performing get');
    }
    return res.json();
  };

  const { data, error, isLoading, mutate } = useSWR<T>(swrKey, fetcher);

  return { data, error, isLoading, mutate };
}
