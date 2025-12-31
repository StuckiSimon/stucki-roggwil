import { format, parseISO, startOfWeek } from 'date-fns';

type Days<T> = [T | null, T | null, T | null, T | null, T | null, T | null, T | null];

type Week<T> = {
  weekStart: string;
  days: Days<T>;
};
export function getWeeksForDates<
  T extends {
    date: string;
  },
>(entries: T[]): Week<T>[] {
  const weeksMap = entries.reduce((weeksMap: Map<string, Days<T>>, entry: T) => {
    const date = parseISO(entry.date);
    const weekStartDate = startOfWeek(date, { weekStartsOn: 1 });
    const weekStart = format(weekStartDate, 'yyyy-MM-dd');

    if (!weeksMap.has(weekStart)) {
      weeksMap.set(weekStart, [null, null, null, null, null, null, null]);
    }
    const days = weeksMap.get(weekStart)!;
    days[date.getDay()] = entry;

    return weeksMap;
  }, new Map<string, Days<T>>());

  return Array.from(weeksMap.entries()).map(([weekStart, days]) => ({ weekStart, days }));
}
