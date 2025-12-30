import React from 'react';
import { Typography } from '@/visual-components/typography/typography';
import { endOfWeek, format, getISOWeek, parseISO, startOfWeek } from 'date-fns';
import styles from './calendar-week-list.module.scss';
import { InlineSpacer } from '@/visual-components/spacer/spacer';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export type WeekChildren = [
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
];

type Props = {
  weeks: {
    weekStart: string;
    children: WeekChildren;
  }[];
};

export const CalendarWeekList: React.FC<Props> = ({ weeks }) => {
  function getWeekNumberAndRange(weekStartStr: string) {
    const start = parseISO(weekStartStr);
    const weekNo = getISOWeek(start);
    const monday = startOfWeek(start, { weekStartsOn: 1 });
    const sunday = endOfWeek(start, { weekStartsOn: 1 });
    const formatDate = (d: Date) => format(d, 'dd.MM.yyyy');
    return {
      weekNo,
      range: `${formatDate(monday)} – ${formatDate(sunday)}`,
    };
  }

  function getWeekDates(weekStartStr: string) {
    const start = parseISO(weekStartStr);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }

  return (
    <div>
      {weeks.map(({ weekStart, children }) => {
        const { weekNo, range } = getWeekNumberAndRange(weekStart);
        const weekDates = getWeekDates(weekStart);
        return (
          <div key={weekStart} className={styles.weekBlock}>
            <div className={styles.weekHeader}>
              <Typography variant="title-3">KW {weekNo}</Typography>
              <Typography variant="sub-text" color="grey">
                {range}
              </Typography>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  {WEEKDAYS.map((day, idx) => (
                    <th key={day} className={styles.th}>
                      <Typography variant="buttontext" color="grey">
                        {day}
                        <InlineSpacer size="03" />
                        <Typography variant="sub-text" color="grey">
                          <span>{format(weekDates[idx], 'dd.MM.')}</span>
                        </Typography>
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {children.map((child, i) => (
                    <td key={i} className={styles.td}>
                      <Typography variant="text">{child}</Typography>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
