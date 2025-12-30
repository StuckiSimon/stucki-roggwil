'use client';
import { buildUseStorageHook } from './build-use-storage-hook';
import sessionStorageManager from './session-storage-manager';

const useSessionStorage = buildUseStorageHook(sessionStorageManager);

export default useSessionStorage;
