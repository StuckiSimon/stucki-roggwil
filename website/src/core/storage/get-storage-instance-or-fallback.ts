'use client';
export const buildFallbackStorage = (): Storage => {
  const storage = new Map<string, string>();
  return {
    getItem: (key: string) => storage.get(key) || null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
    get length() {
      return storage.size;
    },
    key: (index) => {
      const keys = Object.keys(storage.keys());
      return keys[index];
    },
  };
};

/**
 * In cross-origin iframes, localStorage and sessionStorage APIs are not available per default in Incognito Chrome due to privacy settings.
 * There is no suitable fallback implementation, therefore an in-memory fallback is used.
 *
 * It is possible, that other browsers have similar rules under similar circumstances.
 * This restriction makes localStorage unusable in these contexts.
 *
 * @param storageType
 */
export const getStorageInstanceOrFallback = (storageType: 'local' | 'session'): Storage => {
  try {
    return storageType === 'local' ? localStorage : sessionStorage;
  } catch {
    return buildFallbackStorage();
  }
};
