'use client';
import React from 'react';
import { read, utils } from 'xlsx';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import styles from './booking-allocation-excel-reader.module.scss';

type Props = {
  onDataParsed: (data: unknown) => void;
};

export const BookingAllocationExcelReader: React.FC<Props> = ({ onDataParsed }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const parseFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (typeof data === 'string' || data instanceof ArrayBuffer) {
        const workbook = read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet);
        onDataParsed(jsonData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      parseFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && inputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      inputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.dropZone} onDrop={handleDrop} onDragOver={handleDragOver}>
        <Typography variant="text">Excel für Auslastung hierher ziehen oder auswählen</Typography>
        <Spacer size="04" />
        <input
          type="file"
          id="input"
          ref={inputRef}
          onChange={handleInputChange}
          accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
        />
      </div>
    </>
  );
};
