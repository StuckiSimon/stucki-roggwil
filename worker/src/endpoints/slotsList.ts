import { validator } from 'hono/validator';
import { z } from 'zod';
import { Hono } from 'hono';
import { addDays, startOfDay } from 'date-fns';
import { AppContext } from '../types';
import { loadUpcomingCapacities } from '../modules/db/capacityRepository';
import { isDayAvailableForHours } from '../modules/booking/isDayAvailableForHours';
import { getSlotsForDuration } from '../modules/booking/getSlotsForDuration';

// Define how far ahead bookings can be made
const BOOKING_DAYS_AHEAD = 60;

// Define how shortly before a booking can be made
const MIN_BOOKING_NOTICE_DAYS = 2;

const schema = z.object({
  duration: z.coerce.number(),
});

export default (app: Hono<{ Bindings: Env }>) => {
  app.get(
    '/api/slots',
    validator('query', (value, c: AppContext) => {
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        return c.json(parsed.error, 400);
      }
      return parsed.data;
    }),
    async (c) => {
      const { duration } = c.req.valid('query');

      const startDate = addDays(new Date(), MIN_BOOKING_NOTICE_DAYS);
      const nextDay = startOfDay(addDays(startDate, 1));

      const capacities = await loadUpcomingCapacities(nextDay, BOOKING_DAYS_AHEAD - MIN_BOOKING_NOTICE_DAYS);

      const availableDays = capacities.filter((capacity) => {
        return isDayAvailableForHours(capacity, duration);
      });

      const slots = availableDays.flatMap(({ date }) => getSlotsForDuration(date, duration));

      return c.json(
        {
          generated: new Date().toISOString(),
          duration,
          slots,
        },
        200,
      );
    },
  );
};
