'use client';
import { getStorageInstanceOrFallback } from './get-storage-instance-or-fallback';
import { buildStorageManagerSingleton } from './build-storage-manager-singleton';

const sessionStorageManager = buildStorageManagerSingleton(getStorageInstanceOrFallback('session'));

export default sessionStorageManager;
