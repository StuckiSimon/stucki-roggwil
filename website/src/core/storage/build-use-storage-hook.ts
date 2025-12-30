'use client';
import { useCallback, useEffect, useState } from 'react';
import { useStableFunction } from '../hooks/use-stable-function';
import { StorageKey } from './storage-key';
import { buildStorageManagerSingleton } from './build-storage-manager-singleton';
import { notNil } from '@/core/util/is-nil';

export function buildUseStorageHook(manager: ReturnType<typeof buildStorageManagerSingleton>) {
  /**
   * React storage helper with stable references, bound to a specific storage type.
   * @param key Key must be stable
   * @param defaultValue
   */
  function useStorage<T>(key: StorageKey, defaultValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(defaultValue);

    const updateStoredValue = useStableFunction((data: T) => {
      setStoredValue(data ?? defaultValue);
    });

    const listener = useCallback(
      (data: T) => {
        updateStoredValue(data);
      },
      [updateStoredValue],
    );

    useEffect(() => {
      const currentValue = manager.getItem<T>(key);
      if (notNil(currentValue)) {
        setStoredValue(currentValue);
      }
    }, [setStoredValue]);

    useEffect(() => {
      manager.register(key, listener);
      return () => {
        manager.unsubscribe(key, listener);
      };
    }, [key, listener]);

    const setValue = useStableFunction((value: T | ((val: T | null) => T)) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      manager.setItem(key, valueToStore);
    });
    return [storedValue, setValue];
  }

  return useStorage;
}
