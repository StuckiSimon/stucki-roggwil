import { validator } from 'hono/validator';
import { z } from 'zod';
import { Hono } from 'hono';
import { AppContext } from '../types';
import { loadUpcomingCapacities } from '../modules/db/capacityRepository';
import { isDayAvailableForHours } from '../modules/booking/isDayAvailableForHours';
import { getSlotsForDuration } from '../modules/booking/getSlotsForDuration';

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

      const capacities = await loadUpcomingCapacities();

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
