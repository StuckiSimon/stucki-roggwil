import React from 'react';
import classnames from 'classnames';
import styles from './spacer.module.scss';

type Size = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';

type Props = {
  size: Size;
  sizeM?: Size;
  sizeS?: Size;
  sizeXs?: Size;
  axis?: 'horizontal' | 'vertical';
  className?: string;
  // style prop is only intended for the storybook demo
  style?: React.CSSProperties;
};

export const Spacer: React.FC<Props> = ({
  size,
  sizeM = size,
  sizeS = sizeM ?? size,
  sizeXs = sizeS ?? sizeM ?? size,
  axis,
  className,
  style,
}) => {
  return (
    <span
      className={classnames(
        styles.root,
        {
          [styles.vertical]: axis === 'vertical',
          [styles.horizontal]: axis === 'horizontal',
        },
        styles[`space-${size}`],
        className,
      )}
      style={{
        '--stucki-spacer-current-space': `var(--stucki-spacing-${size})`,
        '--stucki-spacer-m-space': `var(--stucki-spacing-${sizeM})`,
        '--stucki-spacer-s-space': `var(--stucki-spacing-${sizeS})`,
        '--stucki-spacer-xs-space': `var(--stucki-spacing-${sizeXs})`,
        ...style,
      }}
    />
  );
};

export const InlineSpacer: React.FC<Omit<Props, 'axis'>> = ({ className, ...rest }) => {
  return <Spacer axis="horizontal" className={classnames(styles.inline, className)} {...rest} />;
};
