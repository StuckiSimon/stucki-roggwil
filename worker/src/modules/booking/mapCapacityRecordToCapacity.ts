import { Capacity } from './types';
import { CapacityRecord } from '../db/schemas';

export function mapCapacityRecordToCapacity(record: CapacityRecord): Capacity {
  return {
    date: record.date,
    capacityHours: record.capacity_hours,
    bookedHours: record.booked_hours,
  };
}
