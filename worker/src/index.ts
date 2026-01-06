import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { basicAuth } from 'hono/basic-auth';
import { cors } from 'hono/cors';
import * as Sentry from '@sentry/cloudflare';
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

const SENTRY_DSN = 'https://731b6dad945cbbb9f99d02491ef9840d@o4510661858164736.ingest.de.sentry.io/4510661873565776';

export default Sentry.withSentry((env: Env) => {
  const { id: versionId } = env.CF_VERSION_METADATA;

  return {
    dsn: SENTRY_DSN,
    release: versionId,
  };
}, app);
