import React from 'react';
import { reduceBookedHourEntries } from '@/modules/capacity-admin/services/reduceBookedHourEntries';
import { CapacityEntry } from '@/modules/capacity-admin/types';
import isNil from '@/core/util/is-nil';
import { BookingPreviewCell } from '@/modules/capacity-admin/booking-preview-cell';
import { CalendarWeekList, WeekChildren } from '@/modules/capacity-admin/calendar-week-list';
import { getWeeksForCapacityEntries } from '@/modules/capacity-admin/services/getWeeksForCapacityEntries';
import { Button } from '@/visual-components/button/button';
import { Typography } from '@/visual-components/typography/typography';
import styles from './booking-allocation-updater.module.scss';

type Props = {
  unfilteredEntries: CapacityEntry[] | null;
};

export const BookingAllocationUpdater: React.FC<Props> = ({ unfilteredEntries }) => {
  const entries = isNil(unfilteredEntries) ? null : reduceBookedHourEntries(unfilteredEntries);
  const weekCapacities = getWeeksForCapacityEntries(entries ?? []);

  if (isNil(entries)) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Typography className={styles.title}>✅ Die Daten sind valide und können aktualisiert werden.</Typography>
        <Button type="submit">Buchungen aktualisieren</Button>
      </form>
      <CalendarWeekList
        weeks={weekCapacities.map(({ weekStart, days }) => ({
          weekStart,
          children: days.map((day) =>
            isNil(day) ? null : <BookingPreviewCell hours={day.capacityHours} />,
          ) as WeekChildren,
        }))}
      />
    </div>
  );
};
