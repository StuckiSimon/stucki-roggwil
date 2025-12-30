import { CapacityRecord } from '@/modules/capacity-admin/services/schemas';
import { format, addDays } from 'date-fns';
import { CapacityEntry } from '@/modules/capacity-admin/types';

// Excel stores dates as number of days since 1899-12-30
const EXCEL_BASE_DATE = new Date(1899, 11, 30);

export function mapCapacityRecordToCapacityEntry(record: CapacityRecord): CapacityEntry {
  const dateObject = addDays(EXCEL_BASE_DATE, record.begindat);
  const date = format(dateObject, 'yyyy-MM-dd');
  return {
    date,
    capacityHours: record.tagdauer,
  };
}
