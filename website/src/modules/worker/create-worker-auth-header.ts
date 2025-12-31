import { AUTH_USERNAME } from '@/modules/worker/constants';

export function createWorkerAuthHeader(adminPassword: string) {
  const encodedAuth = Buffer.from(`${AUTH_USERNAME}:${adminPassword}`).toString('base64');
  return {
    Authorization: `Basic ${encodedAuth}`,
    'Content-Type': 'application/json',
  };
}
