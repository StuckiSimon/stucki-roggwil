import React from 'react';
import styles from './form-layout.module.scss';

type Props = {
  descriptionBlock: React.ReactNode;
  formElements: React.ReactNode[];
  submitBlock: React.ReactNode;
};

export const FormLayout: React.FC<Props> = ({ descriptionBlock, formElements, submitBlock }) => {
  return (
    <div className={styles.root}>
      <div>{descriptionBlock}</div>
      {formElements.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
      <div>{submitBlock}</div>
    </div>
  );
};
