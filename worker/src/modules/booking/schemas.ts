import { z } from 'zod';

export const capacityLimitSchema = z.object({
  date: z.string(),
  capacityHours: z.number(),
});

export const bookingAllocationSchema = z.object({
  date: z.string(),
  bookedHours: z.number(),
});
