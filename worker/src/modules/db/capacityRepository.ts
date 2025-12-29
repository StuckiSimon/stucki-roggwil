import { env } from 'cloudflare:workers';
import { z } from 'zod';
import { capacityRecordSchema } from './schemas';
import { mapCapacityRecordToCapacity } from '../booking/mapCapacityRecordToCapacity';

export async function loadUpcomingCapacities() {
  const { results } = await env.DATABASE.prepare(
    "SELECT * FROM capacity WHERE DATE >= DATE('now') AND DATE < DATE('now', '+7 days')",
  ).run();

  const listOfCapacitySchema = z.array(capacityRecordSchema);
  const capacities = listOfCapacitySchema.parse(results);

  return capacities.map(mapCapacityRecordToCapacity);
}
