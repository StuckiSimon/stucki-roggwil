import type { Metadata } from 'next';
import { Layout } from '@/modules/layout/layout';
import { Index } from '@/modules/booking/slot';

export const metadata: Metadata = {
  title: 'Terminwahl – Garage Stucki AG',
  description: 'Reservieren Sie jetzt Ihren Termin!',
};

export default async function Slot() {
  return (
    <Layout>
      <Index />
    </Layout>
  );
}
