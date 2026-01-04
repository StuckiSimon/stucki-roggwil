import { Slot } from '@/modules/worker/use-slots';
import { compareAsc, isValid, parseISO } from 'date-fns';

export function getFirstAvailableDate(slots: Slot[]): Date | null {
  if (!slots || slots.length === 0) {
    return null;
  }
  const dates = slots.map((slot) => parseISO(slot.date)).filter(isValid);
  if (dates.length === 0) {
    return null;
  }
  const firstDate = dates.reduce((min, d) => (compareAsc(d, min) < 0 ? d : min), dates[0]);
  return firstDate;
}
