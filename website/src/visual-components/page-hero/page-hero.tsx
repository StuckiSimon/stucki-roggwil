import React from 'react';
import { Typography } from '@/visual-components/typography/typography';
import styles from './page-hero.module.scss';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';

type Props = {
  title: string;
  subline: string;
};

export const PageHero: React.FC<Props> = ({ title, subline }) => {
  return (
    <div className={styles.root}>
      <GridContainer>
        <GridItem>
          <Typography variant="title-2" color="white">
            {title}
          </Typography>
          <Typography variant="sub-title" color="white" className={styles.subline}>
            {subline}
          </Typography>
        </GridItem>
      </GridContainer>
    </div>
  );
};
