import { useWorkerPost } from '@/modules/worker/use-worker-post';

export type BookingAllocation = {
  date: string;
  bookedHours: number;
};

export function usePostBookings() {
  return useWorkerPost<BookingAllocation[]>('/api/private/bookings');
}
