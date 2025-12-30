import { z } from 'zod';
import { capacityLimitSchema } from './schemas';

export type Capacity = {
  date: string;
  capacityHours: number;
  bookedHours: number;
};

export type CapacityLimit = z.infer<typeof capacityLimitSchema>;

export type Slot = {
  date: string;
  startHour: string;
  endHour: string;
};
