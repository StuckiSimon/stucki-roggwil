'use client';
import { getStorageInstanceOrFallback } from './get-storage-instance-or-fallback';
import { buildStorageManagerSingleton } from './build-storage-manager-singleton';

const localStorageManager = buildStorageManagerSingleton(getStorageInstanceOrFallback('local'));

export default localStorageManager;
