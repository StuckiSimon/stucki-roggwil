import React, { ReactNode } from 'react';
import styles from './cta-picto-link-grid.module.scss';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  small?: boolean;
};

export const CtaPictoLinkGrid: React.FC<Props> = ({ children, small = false }) => {
  return (
    <div
      className={classNames(styles.root, {
        [styles.small]: small,
      })}
    >
      {children}
    </div>
  );
};
