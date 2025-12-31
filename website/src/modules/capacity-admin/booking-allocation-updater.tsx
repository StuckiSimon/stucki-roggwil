import React from 'react';
import { reduceBookedHourEntries } from '@/modules/capacity-admin/services/reduceBookedHourEntries';
import { CapacityEntry } from '@/modules/capacity-admin/types';
import isNil, { notNil } from '@/core/util/is-nil';
import { BookingPreviewCell } from '@/modules/capacity-admin/booking-preview-cell';
import { CalendarWeekList, WeekChildren } from '@/modules/capacity-admin/calendar-week-list';
import { getWeeksForDates } from '@/modules/capacity-admin/services/getWeeksForDates';
import { Button } from '@/visual-components/button/button';
import { Typography } from '@/visual-components/typography/typography';
import { usePostBookings } from '@/modules/worker/use-post-bookings';
import { InformationBox } from '@/visual-components/information-box/information-box';
import styles from './booking-allocation-updater.module.scss';

type Props = {
  unfilteredEntries: CapacityEntry[] | null;
};

export const BookingAllocationUpdater: React.FC<Props> = ({ unfilteredEntries }) => {
  const entries = isNil(unfilteredEntries) ? null : reduceBookedHourEntries(unfilteredEntries);
  const weekCapacities = getWeeksForDates<CapacityEntry>(entries ?? [], (date) => ({
    date,
    capacityHours: 0,
  }));

  const { trigger, error, data } = usePostBookings();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!entries) return;

    const bookingEntries = entries.map((e) => ({ date: e.date, bookedHours: e.capacityHours }));

    await trigger(bookingEntries);
  };

  if (isNil(entries)) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Typography className={styles.title}>✅ Die Daten sind valide und können aktualisiert werden.</Typography>
        <Button type="submit">Buchungen aktualisieren</Button>
      </form>
      {notNil(error) ? (
        <InformationBox
          variant="error"
          title="Fehler beim aktualisieren der Buchungen"
          description={error?.description ?? undefined}
        />
      ) : null}
      {notNil(data) ? (
        <InformationBox
          variant="success"
          title="Buchungen wurden erfolgreich aktualisiert"
          description="Die Buchungen sind jetzt gespeichert."
        />
      ) : null}
      <CalendarWeekList
        weeks={weekCapacities.map(({ weekStart, days }) => ({
          weekStart,
          children: days.map((day) => <BookingPreviewCell hours={day.capacityHours} />) as WeekChildren,
        }))}
      />
    </div>
  );
};
