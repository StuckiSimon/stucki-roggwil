import { z } from 'zod';

export const capacityRecordSchema = z.object({
  date: z.string(),
  capacity_hours: z.number(),
  booked_hours: z.number(),
});

export type CapacityRecord = z.infer<typeof capacityRecordSchema>;
