import { format, parseISO, startOfWeek } from 'date-fns';

type Days<T> = [T, T, T, T, T, T, T];

type Week<T> = {
  weekStart: string;
  days: Days<T>;
};

export function getWeeksForDates<
  T extends {
    date: string;
  },
>(entries: T[], createFiller: (date: string) => T): Week<T>[] {
  const weeksMap = entries.reduce((weeksMap: Map<string, Days<T | null>>, entry: T) => {
    const date = parseISO(entry.date);
    const weekStartDate = startOfWeek(date, { weekStartsOn: 1 });
    const weekStart = format(weekStartDate, 'yyyy-MM-dd');

    if (!weeksMap.has(weekStart)) {
      weeksMap.set(weekStart, [null, null, null, null, null, null, null]);
    }
    const days = weeksMap.get(weekStart)!;

    const dayIndex = (date.getDay() + 6) % 7;
    days[dayIndex] = entry;

    return weeksMap;
  }, new Map<string, Days<T>>());

  return Array.from(weeksMap.entries()).map(([weekStart, days]) => {
    const weekStartDate = parseISO(weekStart);
    const filledDays = days.map((entry, i) => {
      if (entry) {
        return entry;
      }
      const date = format(new Date(weekStartDate.getTime() + i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
      return createFiller(date);
    }) as Days<T>;
    return { weekStart, days: filledDays };
  });
}
