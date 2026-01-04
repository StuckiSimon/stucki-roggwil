import useLocalStorage from '@/core/storage/use-local-storage.ts';
import { SlotStorageData } from '@/modules/booking/types.ts';
import { StorageKey } from '@/core/storage/storage-key.ts';
import { useEffect } from 'react';
import isNil from '@/core/util/is-nil.ts';
import { Slot } from '@/modules/worker/use-slots.ts';

// Maximum age of stored data: 1 day
const MAX_AGE_MS = 1000 * 60 * 60 * 24;

export function useSlotStorageData() {
  const [serviceStorageData, setServiceStorageData] = useLocalStorage<SlotStorageData | null>(
    StorageKey.BookingSlot,
    null,
  );

  const initialSetDateString = serviceStorageData?.initialSetDate;
  useEffect(() => {
    if (isNil(initialSetDateString)) {
      return;
    }
    const isStorageDataOld = new Date().getTime() - new Date(initialSetDateString).getTime() > MAX_AGE_MS;
    if (isStorageDataOld) {
      setServiceStorageData(null);
    }
  }, [initialSetDateString, setServiceStorageData]);

  return {
    serviceStorageData,
    setServiceStorageData: (slot: Slot | null) => {
      if (isNil(slot)) {
        setServiceStorageData(null);
        return;
      }
      setServiceStorageData({
        initialSetDate: new Date().toISOString(),
        ...slot,
      });
    },
  };
}
