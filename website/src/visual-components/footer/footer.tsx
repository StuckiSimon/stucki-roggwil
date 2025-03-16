import React from 'react';
import logoSvg from '@/visual-components/shared-assets/logo.svg';
import styles from './footer.module.scss';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import instagramSvg from './instagram.svg';
import facebookSvg from './facebook.svg';
import linkedinSvg from './linkedin.svg';

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
            <Spacer size="02" />
            St. Urbanstrasse 35
            <Spacer size="02" />
            4914 Roggwil (BE)
            <Spacer size="04" />
          </Typography>
        </GridItem>
        <GridItem span="4">
          <Typography variant="text" color="white" className={styles.addressBlock}>
            <a href="tel:+410629290505">062 929 05 05</a>
            <Spacer size="02" />
            <a href="mailto:info@stucki-roggwil.ch">info@stucki-roggwil.ch</a>
          </Typography>
        </GridItem>
        <GridItem span="5" className={styles.social}>
          <a href="https://www.instagram.com/garage_stucki_roggwil/" target="_blank">
            <img src={instagramSvg.src} alt="Garage Stucki AG auf Instagram" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100057358815976" target="_blank">
            <img src={facebookSvg.src} alt="Garage Stucki AG auf Facebook" />
          </a>
          <a href="https://www.linkedin.com/company/garage-stucki-ag/" target="_blank">
            <img src={linkedinSvg.src} alt="Garage Stucki AG auf LinkedIn" />
          </a>
        </GridItem>
      </GridContainer>
    </footer>
  );
};
