import React from 'react';
import { notNil } from '@/core/util/is-nil.ts';
import { InformationLine } from '@/visual-components/information-line/information-line.tsx';
import styles from './input-radio.module.scss';
import classNames from 'classnames';
import { Typography } from '@/visual-components/typography/typography.tsx';

export type InputRadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  subLabel?: string;
  error?: string | boolean;
  ref?: React.Ref<HTMLInputElement>;
};

export const InputRadio: React.FC<InputRadioProps> = ({ label, error, ref, id, subLabel, ...rest }) => {
  const inputId = id || `input-radio-${rest.name}-${rest.value}`;
  return (
    <div className={classNames(styles.root)}>
      <input
        {...rest}
        type="radio"
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      <label htmlFor={inputId} className={styles.label}>
        <div className={styles.text}>
          <Typography variant="sub-buttontext">{label}</Typography>
          {notNil(subLabel) ? (
            <Typography variant="sub-text" tag="span" className={styles.subLabel}>
              {subLabel}
            </Typography>
          ) : null}
        </div>
      </label>
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
