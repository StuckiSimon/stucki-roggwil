import { z } from 'zod';

export const capacityRecordSchema = z.object({
  tagdauer: z.number(),
  begindat: z.number(),
});

export type CapacityRecord = z.infer<typeof capacityRecordSchema>;
