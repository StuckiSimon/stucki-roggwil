import React from 'react';
import styles from './fact.module.scss';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';

type Props = {
  id: number;
  title: string;
  description: string;
};

export const Fact: React.FC<Props> = ({ id, title, description }) => {
  return (
    <div className={styles.root}>
      <div className={styles.bullet}>{id}</div>
      <div className={styles.content}>
        <Typography variant="sub-title" color="blue">
          {title}
        </Typography>
        <Spacer size="06" />
        <Typography variant="text">{description}</Typography>
      </div>
    </div>
  );
};
