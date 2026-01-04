import React, { ComponentProps } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './button.module.scss';

type Props = ComponentProps<'button'> & {
  secondary?: boolean;
  accent?: boolean;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({
  className,
  children,
  secondary = false,
  accent = false,
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={classNames(className, styles.root, {
        [styles.secondary]: secondary,
        [styles.accent]: accent,
        [styles.loading]: loading,
      })}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  );
};

type ButtonLinkProps = ComponentProps<typeof NextLink> & {
  secondary?: boolean;
  accent?: boolean;
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  className,
  children,
  accent = false,
  secondary = false,
  ...rest
}) => {
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
