import React from 'react';
import { Slot } from '@/modules/worker/use-slots';
import { addWeeks, subWeeks, startOfWeek, addDays, isSameDay, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Typography } from '@/visual-components/typography/typography';
import isNil from '@/core/util/is-nil.ts';
import styles from './slot-calendar.module.scss';
import classNames from 'classnames';
import { Icon } from '@/visual-components/icon/icon.tsx';

const WEEK_DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

type Props = {
  activeDay: Date | null;
  setActiveDay: (date: Date) => void;
  slots: Slot[];
  selectedSlot: Slot | null;
  setSelectedSlot: (slot: Slot | null) => void;
};

export const SlotCalendar: React.FC<Props> = ({ activeDay, setActiveDay, slots, selectedSlot, setSelectedSlot }) => {
  const weekStart = activeDay ? startOfWeek(activeDay, { weekStartsOn: 1 }) : null;

  if (isNil(weekStart) || isNil(activeDay)) {
    return null;
  }

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const monthName = format(activeDay, 'LLLL', { locale: de });
  const weekNumber = format(weekStart, 'I');

  function getFirstDayWithSlot(weekStart: Date): Date | null {
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      const dayStr = format(day, 'yyyy-MM-dd');
      if (slots.some((slot) => slot.date === dayStr)) {
        return day;
      }
    }
    return null;
  }

  const slotDates = slots.map((slot) => slot.date);
  const minDate = slotDates.length > 0 ? new Date(slotDates.reduce((a, b) => (a < b ? a : b))) : null;
  const maxDate = slotDates.length > 0 ? new Date(slotDates.reduce((a, b) => (a > b ? a : b))) : null;
  const minWeekStart = minDate ? startOfWeek(minDate, { weekStartsOn: 1 }) : null;
  const maxWeekStart = maxDate ? startOfWeek(maxDate, { weekStartsOn: 1 }) : null;

  const isAtMinWeek = minWeekStart && isSameDay(weekStart, minWeekStart);
  const isAtMaxWeek = maxWeekStart && isSameDay(weekStart, maxWeekStart);

  const handlePrevWeek = () => {
    if (isAtMinWeek) return;
    const newWeekStart = subWeeks(weekStart, 1);
    const firstDayWithSlot = getFirstDayWithSlot(newWeekStart);
    setActiveDay(firstDayWithSlot || newWeekStart);
  };
  const handleNextWeek = () => {
    if (isAtMaxWeek) return;
    const newWeekStart = addWeeks(weekStart, 1);
    const firstDayWithSlot = getFirstDayWithSlot(newWeekStart);
    setActiveDay(firstDayWithSlot || newWeekStart);
  };

  const activeDayStr = activeDay ? format(activeDay, 'yyyy-MM-dd') : null;
  const slotsForDay = activeDay ? slots.filter((slot) => slot.date === activeDayStr) : [];

  const handleSelectSlot = (slot: Slot) => setSelectedSlot(slot);

  return (
    <div className={styles.calendarRoot}>
      <div className={styles.calendarHeader}>
        <Typography tag="h2" variant="buttontext">
          {monthName}
        </Typography>
        <Typography tag="span" variant="sub-text" color="grey">
          KW {weekNumber}
        </Typography>
      </div>
      <div className={styles.calendarWeekNav}>
        <button
          type="button"
          onClick={handlePrevWeek}
          aria-label="Vorherige Woche"
          disabled={!!isAtMinWeek}
          className={classNames(styles.calendarArrowButton, styles.prev)}
        >
          <Icon variant="chevron-right" size="32" />
        </button>
        {days.map((day, idx) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const hasSlot = slots.some((slot) => slot.date === dayStr);
          const isActive = activeDay && isSameDay(activeDay, day);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => hasSlot && setActiveDay(day)}
              disabled={!hasSlot}
              className={classNames(styles.calendarDayButton, {
                [styles.active]: isActive,
              })}
            >
              <Typography tag="span" variant="sub-text">
                {WEEK_DAYS[idx]}.
              </Typography>
              <Typography tag="span" variant="sub-buttontext" className={styles.dayNumber}>
                {format(day, 'd.')}
              </Typography>
            </button>
          );
        })}
        <button
          type="button"
          onClick={handleNextWeek}
          aria-label="Nächste Woche"
          disabled={!!isAtMaxWeek}
          className={styles.calendarArrowButton}
        >
          <Icon variant="chevron-right" size="32" />
        </button>
      </div>
      <div className={styles.calendarSlots}>
        {activeDay &&
          (slotsForDay.length > 0 ? (
            <div className={styles.calendarSlotsList}>
              {slotsForDay.map((slot, idx) => {
                const isSelected =
                  selectedSlot &&
                  slot.date === selectedSlot.date &&
                  slot.startHour === selectedSlot.startHour &&
                  slot.endHour === selectedSlot.endHour;
                return (
                  <button
                    key={slot.date + slot.startHour + slot.endHour + idx}
                    type="button"
                    onClick={() => handleSelectSlot(slot)}
                    className={classNames(styles.calendarSlotButton, {
                      [styles.selected]: isSelected,
                    })}
                  >
                    <Typography tag="span" variant="sub-buttontext">
                      {slot.startHour} - {slot.endHour}
                    </Typography>
                  </button>
                );
              })}
            </div>
          ) : (
            <Typography tag="span" variant="sub-text" color="grey">
              Keine verfügbaren Termine für diesen Tag
            </Typography>
          ))}
      </div>
    </div>
  );
};
