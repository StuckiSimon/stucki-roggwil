import { validator } from 'hono/validator';
import { z } from 'zod';
import { Hono } from 'hono';
import { AppContext } from '../types';

const schema = z.object({
  page: z.coerce.number(),
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
    (c) => {
      const { page } = c.req.valid('query');

      return c.json(
        {
          message: 'List of slots',
          page,
        },
        201,
      );
    },
  );
};
