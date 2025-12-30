import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { basicAuth } from 'hono/basic-auth';
import auth from './endpoints/auth';
import capacitiesList from './endpoints/capacitiesList';
import slotsCreate from './endpoints/slotsCreate';
import slotsList from './endpoints/slotsList';

const app = new Hono<{ Bindings: Env }>();

const MIN_ADMIN_KEY_LENGTH = 20;

app.use('/api/private/*', async (c, next) => {
  const adminKey = env(c).ADMIN_KEY;
  if ((adminKey ?? '').length < MIN_ADMIN_KEY_LENGTH) {
    return c.json(
      {
        error: 'Admin key is not set in environment variables or is too short',
      },
      500,
    );
  }

  return basicAuth({
    username: 'admin',
    password: adminKey,
  })(c, next);
});

auth(app);
capacitiesList(app);
slotsList(app);
slotsCreate(app);

export default app;
