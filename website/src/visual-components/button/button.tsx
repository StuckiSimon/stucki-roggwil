import React, { ComponentProps } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './button.module.scss';

type Props = ComponentProps<typeof NextLink> & {
  secondary?: boolean;
  accent?: boolean;
};

export const ButtonLink: React.FC<Props> = ({ className, children, accent = false, secondary = false, ...rest }) => {
  return (
    <NextLink
      className={classNames(className, styles.root, {
        [styles.secondary]: secondary,
        [styles.accent]: accent,
      })}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
