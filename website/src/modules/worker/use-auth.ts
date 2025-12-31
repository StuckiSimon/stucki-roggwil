import { useWorkerGet } from '@/modules/worker/use-worker-get';

type AuthResponse = {
  authenticated: boolean;
};

export function useAuth(shouldFetch: boolean = true) {
  return useWorkerGet<AuthResponse>(shouldFetch ? '/api/private/auth' : null);
}
