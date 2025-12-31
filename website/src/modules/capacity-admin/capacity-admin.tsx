'use client';
import React from 'react';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { useAdminPassword } from '@/modules/admin-layout/useAdminPassword';
import { Capacity, useCapacities } from '@/modules/worker/use-capacities';
import { getWeeksForDates } from '@/modules/capacity-admin/services/getWeeksForDates';
import { CalendarWeekList, WeekChildren } from '@/modules/capacity-admin/calendar-week-list';
import { CapacityPreviewCell } from './capacity-preview-cell';
import { notNil } from '@/core/util/is-nil';
import { usePostCapacities } from '@/modules/worker/use-post-capacities';

export const CapacityAdmin: React.FC = () => {
  const { hasSetAdminPassword } = useAdminPassword();

  const { data: capacitiesData, isLoading: isCapacitiesLoading, error: capacitiesError } = useCapacities();
  const { trigger: postCapacities } = usePostCapacities();

  const weeks = getWeeksForDates<Capacity>(capacitiesData?.capacities ?? []);

  if (!hasSetAdminPassword) {
    return null;
  }

  return (
    <GridContainer>
      <GridItem>
        <CalendarWeekList
          weeks={weeks.map((week) => {
            return {
              weekStart: week.weekStart,
              children: week.days.map((day) => {
                const onBookedHoursChange = (hours: number) => {
                  postCapacities([
                    {
                      date: day?.date ?? week.weekStart, // TODO: handle null date properly
                      capacityHours: hours,
                    },
                  ]);
                };
                return notNil(day) ? (
                  <CapacityPreviewCell
                    bookedHours={day.bookedHours}
                    capacityHours={day.capacityHours}
                    onBookedHoursChange={onBookedHoursChange}
                  />
                ) : (
                  <CapacityPreviewCell bookedHours={0} capacityHours={0} onBookedHoursChange={onBookedHoursChange} />
                );
              }) as WeekChildren,
            };
          })}
        />
      </GridItem>
    </GridContainer>
  );
};
