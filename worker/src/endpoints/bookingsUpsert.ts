import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { z } from 'zod';
import { bookingAllocationSchema } from '../modules/booking/schemas';
import { AppContext } from '../types';
import { upsertBookings } from '../modules/db/capacityRepository';

const schema = z.array(bookingAllocationSchema);

export default (app: Hono<{ Bindings: Env }>) => {
  app.post(
    '/api/private/bookings',
    validator('json', (value, c: AppContext) => {
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        return c.json(parsed.error, 400);
      }
      return parsed.data;
    }),
    async (c) => {
      const bookings = c.req.valid('json');

      await upsertBookings(bookings);

      return c.json(
        {
          message: 'Upserted bookings',
          date: new Date().toISOString(),
        },
        201,
      );
    },
  );
};
