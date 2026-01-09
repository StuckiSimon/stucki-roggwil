import { Capacity } from './types';

const MIN_REQUIRED_HOURS_TO_CONSIDER_DAY_AVAILABLE = 4;
const MIN_REMAINING_CAPACITY_HOURS_TO_CONSIDER_DAY_AVAILABLE = 3;

export function isDayAvailableForHours(day: Capacity, desiredHours: number) {
  const availableHours = day.capacityHours - day.bookedHours;
  const remainingHoursAfterBooking = availableHours - desiredHours;

  if (remainingHoursAfterBooking < MIN_REMAINING_CAPACITY_HOURS_TO_CONSIDER_DAY_AVAILABLE) {
    return false;
  }

  return availableHours >= MIN_REQUIRED_HOURS_TO_CONSIDER_DAY_AVAILABLE;
}
