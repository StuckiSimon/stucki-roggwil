import { Hono } from 'hono';

export default (app: Hono<{ Bindings: Env }>) => {
  app.get('/api/private/auth', async (c) => {
    return c.json(
      {
        authenticated: true,
      },
      200,
    );
  });
};
