import React, { Suspense } from 'react';
import classNames from 'classnames';
import { ICON_TYPE_COMPONENT_MAP, IconVariant, PictogramVariant } from './icon-data';
import isNil from '@/core/util/is-nil';
import styles from './icon.module.scss';

type Size = '12' | '14' | '16' | '24' | '32' | '64' | '128';

type Props = {
  className?: string;
  variant: IconVariant;
  size: Size;
  sizeS?: Size;
};

export const Icon: React.FC<Props> = ({ className, variant, size, sizeS }) => {
  const Icon = ICON_TYPE_COMPONENT_MAP[variant];
  const smallClassname = isNil(sizeS) ? '' : styles[`sizeS${sizeS}`];

  return (
    <Suspense
      fallback={<div className={classNames(styles.loader, styles[`size${size}`], smallClassname, className)} />}
    >
      <Icon className={classNames(styles.root, styles[`size${size}`], smallClassname, className)} />
    </Suspense>
  );
};

export const Pictogram: React.FC<Omit<Props, 'variant'> & { variant: PictogramVariant }> = ({
  className,
  variant,
  size,
  sizeS,
}) => {
  const Pictogram = ICON_TYPE_COMPONENT_MAP[variant];
  const smallClassname = isNil(sizeS) ? '' : styles[`sizeS${sizeS}`];

  return (
    <Suspense
      fallback={<div className={classNames(styles.loader, styles[`size${size}`], smallClassname, className)} />}
    >
      <Pictogram className={classNames(styles.root, styles[`size${size}`], smallClassname, className)} />
    </Suspense>
  );
};
