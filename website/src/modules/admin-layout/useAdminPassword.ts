import useLocalStorage from '@/core/storage/use-local-storage';
import { StorageKey } from '@/core/storage/storage-key';
import { useStableFunction } from '@/core/hooks/use-stable-function';
import { notNil } from '@/core/util/is-nil';

export function useAdminPassword() {
  const [adminPassword, setAdminPasswordRaw] = useLocalStorage<string | null>(StorageKey.AdminPassword, null);

  const setAdminPassword = useStableFunction((password: string | null) => {
    setAdminPasswordRaw(notNil(password) && password.length > 0 ? password : null);
  });

  const resetAdminPassword = useStableFunction(() => {
    setAdminPassword(null);
  });

  return {
    hasSetAdminPassword: notNil(adminPassword),
    adminPassword,
    setAdminPassword,
    resetAdminPassword,
  };
}
