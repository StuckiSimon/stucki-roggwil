import React, { ReactNode } from 'react';
import styles from './call-to-action-fragment.module.scss';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';

type Props = {
  title: string;
  text: string;
  children: ReactNode;
};

export const CallToActionFragment: React.FC<Props> = ({ title, text, children }) => {
  return (
    <div className={styles.root}>
      <div>
        <Typography variant="sub-title" color="blue">
          {title}
        </Typography>
        <Spacer size="03" />
        <Typography variant="text">{text}</Typography>
      </div>
      <div className={styles.action}>{children}</div>
    </div>
  );
};
