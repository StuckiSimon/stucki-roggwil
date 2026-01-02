import React from 'react';
import classNames from 'classnames';
import { Typography } from '../typography/typography';
import styles from './information-line.module.scss';
import { Icon } from '@/visual-components/icon/icon.tsx';

type InformationBoxVariant = 'error';

type Props = {
  variant: InformationBoxVariant;
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const InformationLine: React.FC<Props> = ({ variant, message, ...rest }) => {
  return (
    <div className={classNames(styles.root, styles[variant])} {...rest}>
      <Icon variant="warning" size="16" />
      <Typography variant="sub-text">{message}</Typography>
    </div>
  );
};
