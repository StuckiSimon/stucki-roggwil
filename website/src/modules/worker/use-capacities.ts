import { useWorkerGet } from '@/modules/worker/use-worker-get';

export type Capacity = {
  date: string;
  capacityHours: number;
  bookedHours: number;
};

type CapacitiesResponse = {
  capacities: Capacity[];
};

export function useCapacities(shouldFetch = true) {
  return useWorkerGet<CapacitiesResponse>(shouldFetch ? '/api/private/capacities' : null);
}
