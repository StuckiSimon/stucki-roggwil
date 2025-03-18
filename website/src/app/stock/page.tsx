import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { CarmarketFrame } from '@/app/stock/carmarket-frame';

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
