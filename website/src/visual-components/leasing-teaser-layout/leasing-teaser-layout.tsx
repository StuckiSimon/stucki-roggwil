import React, { ReactNode } from 'react';
import styles from './leasing-teaser-layout.module.scss';

type Props = {
  children: ReactNode;
};

export const LeasingTeaserLayout: React.FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
