import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { basicAuth } from 'hono/basic-auth';
import slotsList from './endpoints/slotsList';

const app = new Hono<{ Bindings: Env }>();

app.use('/api/private/*', async (c, next) => {
  const password = String(env(c).ADMIN_KEY ?? '');
  return basicAuth({
    username: 'admin',
    password,
  })(c, next);
});

slotsList(app);

export default app;
