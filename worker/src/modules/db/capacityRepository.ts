import { env } from 'cloudflare:workers';
import { z } from 'zod';
import { capacityRecordSchema } from './schemas';
import { mapCapacityRecordToCapacity } from '../booking/mapCapacityRecordToCapacity';
import { addDays, formatISO } from 'date-fns';

export async function loadUpcomingCapacities(startingDate: Date, days: number) {
  const startDate = formatISO(startingDate, { representation: 'date' });
  const endDate = formatISO(addDays(startingDate, days), { representation: 'date' });

  const { results } = await env.DATABASE.prepare('SELECT * FROM capacity WHERE DATE >= ? AND DATE < ?')
    .bind(startDate, endDate)
    .run();

  const listOfCapacitySchema = z.array(capacityRecordSchema);
  const capacities = listOfCapacitySchema.parse(results);

  return capacities.map(mapCapacityRecordToCapacity);
}
