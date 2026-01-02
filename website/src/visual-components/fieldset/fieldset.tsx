import React from 'react';
import { Typography } from '@/visual-components/typography/typography.tsx';
import styles from './fieldset.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Fieldset: React.FC<Props> = ({ title, children }) => {
  return (
    <fieldset className={styles.root}>
      <Typography tag="legend" variant="buttontext">
        {title}
      </Typography>
      {children}
    </fieldset>
  );
};
