import { CapacityEntry } from '@/modules/capacity-admin/types';
import { parseISO, startOfWeek, format } from 'date-fns';

type Days = [
  CapacityEntry | null,
  CapacityEntry | null,
  CapacityEntry | null,
  CapacityEntry | null,
  CapacityEntry | null,
  CapacityEntry | null,
  CapacityEntry | null,
];

type Week = {
  weekStart: string;
  days: Days;
};
export function getWeeksForCapacityEntries(capacityEntries: CapacityEntry[]): Week[] {
  const weeksMap = capacityEntries.reduce((weeksMap: Map<string, Days>, entry: CapacityEntry) => {
    const date = parseISO(entry.date);
    const weekStartDate = startOfWeek(date, { weekStartsOn: 1 });
    const weekStart = format(weekStartDate, 'yyyy-MM-dd');

    if (!weeksMap.has(weekStart)) {
      weeksMap.set(weekStart, [null, null, null, null, null, null, null]);
    }
    const days = weeksMap.get(weekStart)!;
    days[date.getDay()] = entry;

    return weeksMap;
  }, new Map<string, Days>());

  return Array.from(weeksMap.entries()).map(([weekStart, days]) => ({ weekStart, days }));
}
