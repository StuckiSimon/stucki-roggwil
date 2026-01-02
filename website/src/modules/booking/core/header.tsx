import React from 'react';
import { GridItem } from '@/visual-components/grid/grid.tsx';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';
import { Typography } from '@/visual-components/typography/typography.tsx';

export const Header: React.FC = () => {
  return (
    <GridItem>
      <Spacer size="07" />
      <Typography variant="title-2" color="blue">
        Online Termin buchen
      </Typography>
      <Spacer size="08" />
    </GridItem>
  );
};
