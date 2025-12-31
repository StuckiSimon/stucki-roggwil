import { useWorkerPost } from '@/modules/worker/use-worker-post';

export type CapacityLimit = {
  date: string;
  capacityHours: number;
};

export function usePostCapacities() {
  return useWorkerPost<CapacityLimit[]>('/api/private/capacities');
}
