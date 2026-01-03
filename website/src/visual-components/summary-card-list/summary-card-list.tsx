import React, { ReactNode } from 'react';
import styles from './summary-card-list.module.scss';

type Props = {
  children: ReactNode;
};

export const SummaryCardList: React.FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
