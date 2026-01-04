import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Layout } from '@/modules/layout/layout';
import { Index } from '@/modules/booking/service';

export const metadata: Metadata = {
  title: 'Dienstleistungswahl – Garage Stucki AG',
  description:
    'Definieren Sie Ihre Dienstleistung online. Schnell, einfach und zuverlässig – reservieren Sie jetzt Ihren Termin!',
};

export default async function Service() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Index />
      </Suspense>
    </Layout>
  );
}
