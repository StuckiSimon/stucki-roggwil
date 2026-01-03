import React from 'react';
import { Typography } from '@/visual-components/typography/typography.tsx';
import styles from './summary-card.module.scss';
import { LinkButton } from '@/visual-components/link/link.tsx';

type Props = {
  title: string;
  description: string;
  onDismiss: () => void;
};

export const SummaryCard: React.FC<Props> = ({ title, description, onDismiss }) => {
  return (
    <div className={styles.root}>
      <div className={styles.titleBar}>
        <Typography variant="buttontext">{title}</Typography>
        <LinkButton small onClick={onDismiss}>
          Entfernen
        </LinkButton>
      </div>
      <Typography>{description}</Typography>
    </div>
  );
};
