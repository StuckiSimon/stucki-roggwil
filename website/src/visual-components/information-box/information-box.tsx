import React from 'react';
import classNames from 'classnames';
import { Typography } from '../typography/typography';
import { notNil } from '@/core/util/is-nil';
import styles from './information-box.module.scss';

type InformationBoxVariant = 'success' | 'warning' | 'error' | 'info';

type Props = {
  variant: InformationBoxVariant;
  title: string;
  description?: string;
};

export const InformationBox: React.FC<Props> = ({ variant, title, description }) => {
  return (
    <div className={classNames(styles.root, styles[variant])}>
      <Typography variant="buttontext">{title}</Typography>
      {notNil(description) ? (
        <Typography color="grey" variant="sub-text">
          {description}
        </Typography>
      ) : null}
    </div>
  );
};
