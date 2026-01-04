import React, { ReactNode } from 'react';
import styles from './form-sibling-layout.module.scss';

type Props = {
  left: ReactNode;
  right: ReactNode;
};

export const FormSiblingLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <div className={styles.root}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};
