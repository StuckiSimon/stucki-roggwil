import { useWorkerGetAnonymous } from '@/modules/worker/use-worker-get-anonymous.ts';

export type Slot = {
  date: string;
  startHour: string;
  endHour: string;
};

type SlotResponse = {
  slots: Slot[];
};

export function useSlots(duration: number) {
  return useWorkerGetAnonymous<SlotResponse>(duration > 0 ? `/api/slots?duration=${duration}` : null);
}
