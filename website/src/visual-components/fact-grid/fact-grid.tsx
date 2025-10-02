import React, { ReactNode } from 'react';
import styles from './fact-grid.module.scss';

type Props = {
  children: ReactNode;
};

export const FactGrid: React.FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
