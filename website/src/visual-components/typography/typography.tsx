import React, { JSX } from 'react';
import classNames from 'classnames';
import styles from './typography.module.scss';

export type TypographyVariant = 'title-1' | 'title-2' | 'title-3' | 'sub-title' | 'buttontext' | 'text';

export type TypographyColor = 'black' | 'blue' | 'white' | 'grey';

const VARIANT_DEFAULT_TAG_MAP: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  'title-1': 'h1',
  'title-2': 'h1',
  'title-3': 'h2',
  'sub-title': 'h2',
  buttontext: 'p',
  text: 'p',
};

type Props = {
  variant?: TypographyVariant;
  tag?: keyof JSX.IntrinsicElements;
  color?: TypographyColor;
} & React.HTMLAttributes<HTMLOrSVGElement>;

export const Typography: React.FC<Props> = ({ tag, variant = 'text', color = 'black', className, ...rest }) => {
  const Component = tag === undefined ? VARIANT_DEFAULT_TAG_MAP[variant] : tag;
  const colorClassname = `color-${color}`;

  return (
    <Component
      className={classNames(
        styles.typography,
        styles[variant],
        {
          [styles[colorClassname]]: color !== 'black',
        },
        className,
      )}
      {...rest}
    />
  );
};
