import type { Metadata } from 'next';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { CarmarketFrame } from '@/app/stock/carmarket-frame';

export const metadata: Metadata = {
  title: 'Lagerfahrzeuge | Garage Stucki AG',
  description:
    'Entdecken Sie unsere Lagerfahrzeuge: Neuwagen, Gebrauchtwagen und Vorführwagen der Marken KGM, SsangYong, Ford. Jetzt informieren und Probefahrt vereinbaren!',
};

export default async function Stock() {
  return (
    <Layout activePath="/stock">
      <GridContainer>
        <GridItem>
          <CarmarketFrame />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
