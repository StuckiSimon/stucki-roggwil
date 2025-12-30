import React from 'react';
import { reduceBookedHourEntries } from '@/modules/capacity-admin/services/reduceBookedHourEntries';
import { CapacityEntry } from '@/modules/capacity-admin/types';
import isNil, { notNil } from '@/core/util/is-nil';
import { BookingPreviewCell } from '@/modules/capacity-admin/booking-preview-cell';
import { CalendarWeekList, WeekChildren } from '@/modules/capacity-admin/calendar-week-list';
import { getWeeksForCapacityEntries } from '@/modules/capacity-admin/services/getWeeksForCapacityEntries';

type Props = {
  unfilteredEntries: CapacityEntry[] | null;
};

export const CapacityUpdater: React.FC<Props> = ({ unfilteredEntries }) => {
  const entries = isNil(unfilteredEntries) ? null : reduceBookedHourEntries(unfilteredEntries);
  const weekCapacities = getWeeksForCapacityEntries(entries || []);

  return (
    <>
      {notNil(entries) ? (
        <CalendarWeekList
          weeks={weekCapacities.map(({ weekStart, days }) => ({
            weekStart,
            children: days.map((day) =>
              isNil(day) ? null : <BookingPreviewCell hours={day.capacityHours} />,
            ) as WeekChildren,
          }))}
        />
      ) : null}
    </>
  );
};
