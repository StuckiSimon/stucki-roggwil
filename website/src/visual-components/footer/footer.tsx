import React from 'react';
import logoSvg from '@/visual-components/shared-assets/logo.svg';
import styles from './footer.module.scss';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Typography } from '@/visual-components/typography/typography';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.root}>
      <GridContainer>
        <GridItem>
          <img src={logoSvg.src} alt="Garage Stucki AG" className={styles.logo} />
        </GridItem>
        <GridItem span="3">
          <Typography variant="text" color="white" className={styles.addressBlock}>
            Garage Stucki AG
            <br />
            St. Urbanstrasse 35
            <br />
            4914 Roggwil (BE)
          </Typography>
        </GridItem>
        <GridItem span="4">
          <Typography variant="text" color="white" className={styles.addressBlock}>
            062 929 05 05
            <br />
            info@stucki-roggwil.ch
          </Typography>
        </GridItem>
        <GridItem span="5"></GridItem>
      </GridContainer>
    </footer>
  );
};
