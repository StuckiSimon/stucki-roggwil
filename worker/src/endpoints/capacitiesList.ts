import { Hono } from 'hono';
import { loadUpcomingCapacities } from '../modules/db/capacityRepository';

const CAPACITY_DAYS_AHEAD = 80;

export default (app: Hono<{ Bindings: Env }>) => {
  app.get('/api/private/capacities', async (c) => {
    const today = new Date();
    const capacities = await loadUpcomingCapacities(today, CAPACITY_DAYS_AHEAD);

    return c.json(
      {
        capacities,
      },
      200,
    );
  });
};
