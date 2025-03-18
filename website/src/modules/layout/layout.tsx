import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Header } from '@/visual-components/header/header';
import { Footer } from '@/visual-components/footer/footer';
import styles from './layout.module.scss';

type Props = {
  accent?: boolean;
  children: ReactNode;
  className?: string;
};

export const Layout: React.FC<Props> = ({ accent = false, children, className }) => {
  return (
    <div className={classNames(styles.root, className)}>
      <div>
        <Header accent={accent} />
        {children}
      </div>
      <Footer />
    </div>
  );
};
