import React from 'react';
import { notNil } from '@/core/util/is-nil.ts';
import { InformationLine } from '@/visual-components/information-line/information-line.tsx';
import classNames from 'classnames';
import { Typography } from '@/visual-components/typography/typography.tsx';
import styles from './input-textarea.module.scss';

type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'type'> & {
  label: string;
  error?: string | boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
};

export const InputTextarea: React.FC<Props> = ({ label, error, ref, id, ...rest }) => {
  const inputId = id || `input-textarea-${rest.name}-${rest.value}`;
  return (
    <div className={classNames(styles.root)}>
      <label htmlFor={inputId} className={styles.label}>
        <div className={styles.text}>
          <Typography>{label}</Typography>
        </div>
      </label>
      <textarea
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
