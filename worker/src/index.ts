import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { basicAuth } from 'hono/basic-auth';
import { cors } from 'hono/cors';
import auth from './endpoints/auth';
import bookingsCreate from './endpoints/bookingsCreate';
import bookingsUpsert from './endpoints/bookingsUpsert';
import capacitiesUpsert from './endpoints/capacitiesUpsert';
import capacitiesList from './endpoints/capacitiesList';
import slotsList from './endpoints/slotsList';

const app = new Hono<{ Bindings: Env }>();

const MIN_ADMIN_KEY_LENGTH = 20;

app.use('/api/*', cors());
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
bookingsCreate(app);
bookingsUpsert(app);
capacitiesList(app);
capacitiesUpsert(app);
slotsList(app);

export default app;
