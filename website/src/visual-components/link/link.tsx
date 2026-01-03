import React, { ComponentProps } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './link.module.scss';

type Props = ComponentProps<typeof NextLink> & {
  accent?: boolean;
  active?: boolean;
  small?: boolean;
};

export const Link: React.FC<Props> = ({
  className,
  children,
  accent = false,
  active = false,
  small = false,
  ...rest
}) => {
  return (
    <NextLink
      className={classNames(className, styles.root, styles.animatedUnderline, {
        [styles.accent]: accent,
        [styles.active]: active,
        [styles.small]: small,
      })}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
