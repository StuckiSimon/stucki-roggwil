import React, { useState, useRef } from 'react';
import styles from './capacity-preview-cell.module.scss';

type Props = {
  bookedHours: number;
  capacityHours: number;
  onBookedHoursChange: (newValue: number) => Promise<void>;
};

export const CapacityPreviewCell: React.FC<Props> = ({ bookedHours, capacityHours, onBookedHoursChange }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(`${capacityHours}`);
  const [isErrored, setIsErrored] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  React.useEffect(() => {
    setInputValue(`${capacityHours}`);
  }, [bookedHours]);

  const isOverbooked = bookedHours > capacityHours;
  const bookedPercent = (Math.min(bookedHours, capacityHours) / capacityHours) * 100;
  const freePercent = !isOverbooked ? ((capacityHours - bookedHours) / capacityHours) * 100 : 0;
  const overbookedPercent = isOverbooked ? ((bookedHours - capacityHours) / capacityHours) * 100 : 0;

  const handleCellClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const finishEditing = () => {
    setEditing(false);
    const inputNumber = parseFloat(inputValue);
    if (isNaN(inputNumber) || inputNumber < 0) {
      setIsErrored(true);
      return;
    }

    setIsErrored(false);
    if (inputNumber !== bookedHours) {
      onBookedHoursChange(inputNumber);
    }
  };

  const handleInputBlur = () => {
    finishEditing();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setEditing(false);
      setInputValue(`${capacityHours}`);
    }
  };

  return (
    <span className={styles.root} title={`${bookedHours}h / ${capacityHours}h`} onClick={handleCellClick}>
      <span className={styles.barContainer}>
        <span className={styles.booked} style={{ width: `${bookedPercent}%` }} />
        {!isOverbooked && freePercent > 0 && <span className={styles.free} style={{ width: `${freePercent}%` }} />}
        {isOverbooked && overbookedPercent > 0 && (
          <span className={styles.overbooked} style={{ width: `${overbookedPercent}%` }} />
        )}
      </span>
      <span className={styles.label}>
        {bookedHours}h /{' '}
        {editing ? (
          <input
            ref={inputRef}
            inputMode="numeric"
            min={0}
            max={60}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className={styles.input}
          />
        ) : (
          <>
            {capacityHours}h {isErrored ? '⚠️' : '✏️'}
          </>
        )}
      </span>
    </span>
  );
};
