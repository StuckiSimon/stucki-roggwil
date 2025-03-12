import React, { ReactNode } from 'react';
import isNil from '@/core/util/is-nil';
import { Header } from '@/visual-components/header/header';
import { Footer } from '@/visual-components/footer/footer';
import styles from './layout.module.scss';

type Props = {
  accent?: boolean;
  backdrop?: ReactNode;
  children: ReactNode;
};

export const Layout: React.FC<Props> = ({ accent = false, backdrop, children }) => {
  return (
    <div className={styles.root}>
      <div>
        {isNil(backdrop) ? null : backdrop}
        <Header accent={accent} />
        {children}
      </div>
      <Footer />
    </div>
  );
};
