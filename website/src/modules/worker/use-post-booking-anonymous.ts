import { Slot } from '@/modules/worker/use-slots.ts';
import { useWorkerPostAnonymous } from '@/modules/worker/use-worker-post-anonymous.ts';

export type UserBooking = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment?: string;
  brand?: string;
  model?: string;
  licensePlate?: string;
  services: string[];
  slot: Slot;
};

export function usePostBookingAnonymous() {
  return useWorkerPostAnonymous<UserBooking>('/api/bookings');
}
