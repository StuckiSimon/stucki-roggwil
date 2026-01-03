import React from 'react';
import styles from './process-navigation-layout.module.scss';

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const ProcessNavigationLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <>
      <div className={styles.root}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </>
  );
};
