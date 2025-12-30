import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { z } from 'zod';
import { capacityLimitSchema } from '../modules/booking/schemas';
import { AppContext } from '../types';
import { upsertCapacities } from '../modules/db/capacityRepository';

const schema = z.array(capacityLimitSchema);

export default (app: Hono<{ Bindings: Env }>) => {
  app.post(
    '/api/private/capacities',
    validator('json', (value, c: AppContext) => {
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        return c.json(parsed.error, 400);
      }
      return parsed.data;
    }),
    async (c) => {
      const capacities = c.req.valid('json');

      await upsertCapacities(capacities);

      return c.json(
        {
          message: 'Upserted capacities',
          date: new Date().toISOString(),
        },
        201,
      );
    },
  );
};
