import { CapacityEntry } from '@/modules/capacity-admin/types';

export function reduceBookedHourEntries(entries: CapacityEntry[]): CapacityEntry[] {
  const aggregatedMap = entries.reduce((accumulator: Map<string, number>, entry) => {
    const currentHours = accumulator.get(entry.date) || 0;
    accumulator.set(entry.date, currentHours + entry.capacityHours);
    return accumulator;
  }, new Map<string, number>());

  const reducedEntries: CapacityEntry[] = Array.from(aggregatedMap, ([date, capacityHours]) => ({
    date,
    capacityHours,
  })).map((entry) => ({
    ...entry,
    capacityHours: Math.round(entry.capacityHours * 100) / 100,
  }));

  return reducedEntries.filter((entry) => entry.capacityHours > 0);
}
