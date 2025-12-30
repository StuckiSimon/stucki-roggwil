import React from 'react';
import styles from './booking-preview-cell.module.scss';

type Props = {
  hours: number;
};

export const BookingPreviewCell: React.FC<Props> = ({ hours }) => {
  return <div className={styles.root}>{hours} h</div>;
};
