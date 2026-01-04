import React from 'react';
import { notNil } from '@/core/util/is-nil.ts';
import { InformationLine } from '@/visual-components/information-line/information-line.tsx';
import styles from './input-text.module.scss';
import classNames from 'classnames';
import { Typography } from '@/visual-components/typography/typography.tsx';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string | boolean;
  ref?: React.Ref<HTMLInputElement>;
};

export const InputText: React.FC<Props> = ({ label, error, ref, id, ...rest }) => {
  const inputId = id || `input-text-${rest.name}-${rest.value}`;
  return (
    <div className={classNames(styles.root)}>
      <label htmlFor={inputId} className={styles.label}>
        <div className={styles.text}>
          <Typography>{label}</Typography>
        </div>
      </label>
      <input
        {...rest}
        type="text"
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={styles.input}
      />
      {notNil(error) ? (
        <InformationLine
          variant="error"
          message={typeof error === 'string' ? error : 'Fehler'}
          id={`${inputId}-error`}
          role="alert"
        />
      ) : null}
    </div>
  );
};
