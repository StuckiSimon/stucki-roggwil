'use client';
import { StorageKey } from './storage-key';
import isNil from '@/core/util/is-nil';

type ListenerMap = Map<(data: unknown) => void, boolean>;

const notifyListeners = (data: unknown, listenerMap: ListenerMap): void => {
  listenerMap.forEach((_, listener) => listener(data));
};

export const buildStorageManagerSingleton = (
  storage: Storage,
  globalParam:
    | {
        addEventListener: (type: string, listener: (event: StorageEvent) => void) => void;
        removeEventListener: (type: string, listener: (event: StorageEvent) => void) => void;
      }
    | undefined = undefined,
) => {
  let global = globalParam;
  if (isNil(global) && typeof window !== 'undefined') {
    global = window;
  }

  if (isNil(global)) {
    return {
      register: () => {},
      registerSyncListener: () => {},
      unsubscribe: () => {},
      unsubscribeSyncListener: () => {},
      setItem: () => {},
      getItem: <T>(_key: StorageKey): T | null => {
        return null;
      },
      destroy: () => {},
    };
  }

  let data = new Map<
    string,
    {
      data: unknown;
      listeners: ListenerMap;
      syncListeners: ListenerMap;
    }
  >();

  const storageEventListener = (event: StorageEvent): void => {
    if (event.storageArea !== storage) {
      return;
    }
    if (event.key) {
      const entry = data.get(event.key);
      if (entry) {
        entry.data = event.newValue === null ? null : JSON.parse(event.newValue);
        notifyListeners(entry.data, entry.listeners);
        notifyListeners(entry.data, entry.syncListeners);
      }
    } else {
      // storage cleared
      data.forEach((entry) => {
        entry.data = null;
        notifyListeners(entry.data, entry.listeners);
        notifyListeners(entry.data, entry.syncListeners);
      });
    }
  };

  global.addEventListener('storage', storageEventListener);

  const getOrCache = <T = unknown>(
    key: string,
  ): { data: T | null; listeners: ListenerMap; syncListeners: ListenerMap } => {
    let cacheEntry = data.get(key) as {
      data: T | null;
      listeners: ListenerMap;
      syncListeners: ListenerMap;
    };
    if (!cacheEntry) {
      const item = storage.getItem(key);
      let dataObject = null;
      if (item !== null) {
        dataObject = JSON.parse(item) as T;
      }
      cacheEntry = { data: dataObject, listeners: new Map(), syncListeners: new Map() };
      data.set(key, cacheEntry);
    }
    return cacheEntry;
  };

  return {
    /**
     * Registers a listener that will be called whenever the localstorage changes (even when triggered by current tab).
     * @param key
     * @param listener
     */
    register: <T = unknown>(key: StorageKey, listener: (data: T) => void) => {
      const cacheEntry = getOrCache(key);
      cacheEntry.listeners.set(listener as (data: unknown) => void, true);

      return cacheEntry.data;
    },
    /**
     * Registers a listener that will be only be called when data is externally synced to localstorage.
     * @param key
     * @param listener
     */
    registerSyncListener: <T = unknown>(key: StorageKey, listener: (data: T) => void) => {
      const cacheEntry = getOrCache(key);
      cacheEntry.syncListeners.set(listener as (data: unknown) => void, true);

      return cacheEntry.data;
    },
    unsubscribe: <T = unknown>(key: StorageKey, listener: (data: T) => void) => {
      const cacheEntry = data.get(key);
      if (cacheEntry) {
        cacheEntry.listeners.delete(listener as (data: unknown) => void);
      }
    },
    unsubscribeSyncListener: <T = unknown>(key: StorageKey, listener: (data: T) => void) => {
      const cacheEntry = data.get(key);
      if (cacheEntry) {
        cacheEntry.syncListeners.delete(listener as (data: unknown) => void);
      }
    },
    /**
     * Sets a value in localstorage. Pass null to remove the value.
     * @param key
     * @param value
     */
    setItem: (key: StorageKey, value: unknown) => {
      const cacheEntry = data.get(key);
      if (cacheEntry) {
        cacheEntry.data = value;
        notifyListeners(cacheEntry.data, cacheEntry.listeners);
      }
      if (value === null) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSON.stringify(value));
      }
    },
    getItem: <T>(key: StorageKey): T => {
      const cacheEntry = getOrCache(key);
      return cacheEntry.data as T;
    },
    destroy: () => {
      global.removeEventListener('storage', storageEventListener);
      data = new Map();
    },
  };
};
