import { Capacity } from './types';

const MIN_REQUIRED_HOURS_TO_CONSIDER_DAY_AVAILABLE = 4;

export function isDayAvailableForHours(day: Capacity, desiredHours: number) {
  const availableHours = day.capacityHours - day.bookedHours;

  return availableHours >= desiredHours && availableHours >= MIN_REQUIRED_HOURS_TO_CONSIDER_DAY_AVAILABLE;
}
