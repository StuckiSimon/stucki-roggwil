import React from 'react';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import { Link } from '@/visual-components/link/link';
import { usePathBuilder } from '@/core/router/use-path-builder';

export const NotFoundPage: React.FC = () => {
  const { servicesPath, homePath } = usePathBuilder();

  return (
    <Layout>
      <GridContainer>
        <GridItem>
          <Spacer size="08" />
          <Typography variant="title-1">404</Typography>
          <Spacer size="03" />
          <Typography variant="sub-title">Seite nicht gefunden</Typography>
          <Spacer size="06" />
          <Typography variant="text" tag="span">
            Wie wär&#39;s mit etwas anderem:{' '}
          </Typography>
          <Link href={servicesPath()}>Zu den Dienstleistungen</Link>
          <Typography variant="text" tag="span">
            {' '}
            oder direkt{' '}
          </Typography>
          <Link href={homePath()}>zur Startseite</Link>
        </GridItem>
      </GridContainer>
      <Spacer size="09" />
    </Layout>
  );
};

export default NotFoundPage;
