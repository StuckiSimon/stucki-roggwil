import { z } from 'zod';

export const capacityLimitSchema = z.object({
  date: z.string(),
  capacityHours: z.number(),
});

export const bookingAllocationSchema = z.object({
  date: z.string(),
  bookedHours: z.number(),
});

export const slotSchema = z.object({
  date: z.string(),
  startHour: z.string(),
  endHour: z.string(),
});

export const userBookingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  comment: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  licensePlate: z.string().optional(),
  services: z.array(z.string()),
  slot: slotSchema,
});
