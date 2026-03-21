import React from 'react';
import styles from './tire-brand-card.module.scss';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';

type Props = {
  logo: { src: string };
  name: string;
  description: string;
};

export const TireBrandCard: React.FC<Props> = ({ logo, name, description }) => {
  return (
    <div className={styles.root}>
      <div className={styles.logoWrapper}>
        <img src={logo.src} alt={name} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <Typography variant="sub-title" color="blue">
          {name}
        </Typography>
        <Spacer size="05" />
        <Typography variant="text">{description}</Typography>
      </div>
    </div>
  );
};
