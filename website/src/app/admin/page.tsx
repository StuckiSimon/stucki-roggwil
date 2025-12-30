import { AdminLayout } from '@/modules/admin-layout/admin-layout';
import { CapacityAdmin } from '@/modules/capacity-admin/capacity-admin';

export default async function AdminHome() {
  return (
    <AdminLayout>
      <CapacityAdmin />
    </AdminLayout>
  );
}
