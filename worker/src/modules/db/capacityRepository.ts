import { env } from 'cloudflare:workers';
import { z } from 'zod';
import { capacityRecordSchema } from './schemas';
import { mapCapacityRecordToCapacity } from '../booking/mapCapacityRecordToCapacity';
import { addDays, formatISO } from 'date-fns';
import { CapacityLimit } from '../booking/types';

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

export async function upsertCapacities(capacities: CapacityLimit[]) {
  if (capacities.length === 0) {
    return;
  }

  const valuesPlaceholders = capacities.map(() => '(?, ?, 0)').join(', ');
  const sql = `INSERT INTO capacity (date, capacity_hours, booked_hours) VALUES ${valuesPlaceholders}
    ON CONFLICT(date) DO UPDATE SET capacity_hours=excluded.capacity_hours`;
  const values = capacities.flatMap(({ date, capacityHours }) => [date, capacityHours]);

  await env.DATABASE.prepare(sql)
    .bind(...values)
    .run();
}
