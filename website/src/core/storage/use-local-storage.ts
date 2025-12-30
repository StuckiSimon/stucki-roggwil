'use client';
import localStorageManager from './local-storage-manager';
import { buildUseStorageHook } from './build-use-storage-hook';

const useLocalStorage = buildUseStorageHook(localStorageManager);

export default useLocalStorage;
