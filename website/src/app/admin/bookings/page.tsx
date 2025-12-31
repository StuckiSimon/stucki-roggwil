import { AdminLayout } from '@/modules/admin-layout/admin-layout';
import { BookingAllocationAdmin } from '@/modules/capacity-admin/booking-allocation-admin';

export default async function AdminBookings() {
  return (
    <AdminLayout>
      <BookingAllocationAdmin />
    </AdminLayout>
  );
}
