import { parse, addHours, format } from 'date-fns';
import { Slot } from './types';

// Everything longer than FULL_DAY_HOURS is considered a full day booking
// Currently all services except "service" are only one hour
const FULL_DAY_HOURS = 1;

const oneHourStartTimes = ['07:30', '11:00', '13:30', '16:30'];

export function getSlotsForDuration(day: string, duration: number): Slot[] {
  if (duration > FULL_DAY_HOURS) {
    return [
      {
        date: day,
        startHour: '07:30',
        endHour: '17:30',
      },
    ];
  }

  return oneHourStartTimes.map((startHour) => {
    const hour = parse(startHour, 'HH:mm', new Date());
    const endHour = format(addHours(hour, duration), 'HH:mm');

    return {
      date: day,
      startHour,
      endHour,
    };
  });
}
