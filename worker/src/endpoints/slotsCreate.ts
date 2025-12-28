import { Hono } from 'hono';

export default (app: Hono<{ Bindings: Env }>) => {
  app.get('/api/private/slots', (c) => {
    return c.json(
      {
        message: 'Created slots',
        date: new Date().toISOString(),
      },
      201,
    );
  });
};
