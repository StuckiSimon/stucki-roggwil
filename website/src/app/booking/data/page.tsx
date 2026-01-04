import type { Metadata } from 'next';
import { Layout } from '@/modules/layout/layout';
import { Index } from '@/modules/booking/customer-details';

export const metadata: Metadata = {
  title: 'Kontaktdaten – Garage Stucki AG',
  description: 'Geben Sie Ihre Kontaktdaten ein, um Ihren Termin zu reservieren.',
};

export default async function Data() {
  return (
    <Layout>
      <Index />
    </Layout>
  );
}
