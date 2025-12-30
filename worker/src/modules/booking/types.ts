import { z } from 'zod';
import { bookingAllocationSchema, capacityLimitSchema } from './schemas';

export type Capacity = {
  date: string;
  capacityHours: number;
  bookedHours: number;
};

export type CapacityLimit = z.infer<typeof capacityLimitSchema>;

export type BookingAllocation = z.infer<typeof bookingAllocationSchema>;

export type Slot = {
  date: string;
  startHour: string;
  endHour: string;
};
