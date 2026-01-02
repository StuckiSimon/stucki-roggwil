import React, { ReactNode } from 'react';
import styles from './cta-picto-link-grid.module.scss';

type Props = {
  children: ReactNode;
};

export const CtaPictoLinkGrid: React.FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
