import { parse, addHours, format } from 'date-fns';
import { Slot } from './types';

// Everything longer than MINIMUM_DURATION_HOUR is considered a half-day booking
const MINIMUM_DURATION_HOUR = 1;

// Everything longer than HALF_DAY_HOURS is considered a full-day booking
const HALF_DAY_HOURS = 3;

const oneHourStartTimes = ['07:30', '11:00', '13:30', '16:30'];

const halfDayStartTimes = ['07:30', '13:30'];

export function getSlotsForDuration(day: string, duration: number): Slot[] {
  if (duration > HALF_DAY_HOURS) {
    return [
      {
        date: day,
        startHour: '07:30',
        endHour: '17:30',
      },
    ];
  }

  let startHours = oneHourStartTimes;
  if (duration > MINIMUM_DURATION_HOUR) {
    startHours = halfDayStartTimes;
  }

  return startHours.map((startHour) => {
    const hour = parse(startHour, 'HH:mm', new Date());
    const endHour = format(addHours(hour, duration), 'HH:mm');

    return {
      date: day,
      startHour,
      endHour,
    };
  });
}
