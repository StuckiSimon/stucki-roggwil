import type { Metadata } from 'next';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { CarmarketFrame } from '@/app/stock/carmarket-frame';
import { usePathBuilder } from '@/core/router/use-path-builder';

export const metadata: Metadata = {
  title: 'Lagerfahrzeuge | Garage Stucki AG',
  description:
    'Entdecken Sie unsere Lagerfahrzeuge: Neuwagen, Gebrauchtwagen und Vorführwagen der Marken KGM, SsangYong, Ford. Jetzt informieren und Probefahrt vereinbaren!',
};

export default function Stock() {
  const { stockPath } = usePathBuilder();

  return (
    <Layout activePath={stockPath()}>
      <GridContainer>
        <GridItem>
          <CarmarketFrame />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
