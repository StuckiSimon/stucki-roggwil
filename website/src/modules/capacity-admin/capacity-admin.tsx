'use client';
import React from 'react';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { useAdminPassword } from '@/modules/admin-layout/useAdminPassword';
import { Capacity, useCapacities } from '@/modules/worker/use-capacities';
import { getWeeksForDates } from '@/modules/capacity-admin/services/getWeeksForDates';
import { CalendarWeekList, WeekChildren } from '@/modules/capacity-admin/calendar-week-list';
import { CapacityPreviewCell } from './capacity-preview-cell';
import { usePostCapacities } from '@/modules/worker/use-post-capacities';
import isNil from '@/core/util/is-nil';

export const CapacityAdmin: React.FC = () => {
  const { hasSetAdminPassword } = useAdminPassword();

  const { data: capacitiesData, isLoading: isCapacitiesLoading, error: capacitiesError, mutate } = useCapacities();
  const { trigger: postCapacities } = usePostCapacities();

  const weeks = getWeeksForDates<Capacity>(capacitiesData?.capacities ?? [], (date) => ({
    date,
    bookedHours: 0,
    capacityHours: 0,
  }));

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
                const onBookedHoursChange = async (hours: number) => {
                  await postCapacities([
                    {
                      date: day.date,
                      capacityHours: hours,
                    },
                  ]);
                  await mutate(
                    (prevData) => {
                      if (isNil(prevData)) {
                        return prevData;
                      }
                      const exists = prevData.capacities.some((c) => c.date === day.date);
                      return {
                        ...prevData,
                        capacities: exists
                          ? prevData.capacities.map((c) => (c.date === day.date ? { ...c, capacityHours: hours } : c))
                          : [
                              ...prevData.capacities,
                              {
                                date: day.date,
                                capacityHours: hours,
                                bookedHours: 0,
                              },
                            ],
                      };
                    },
                    {
                      revalidate: false,
                    },
                  );
                };
                return (
                  <CapacityPreviewCell
                    bookedHours={day.bookedHours}
                    capacityHours={day.capacityHours}
                    onBookedHoursChange={onBookedHoursChange}
                  />
                );
              }) as WeekChildren,
            };
          })}
        />
      </GridItem>
    </GridContainer>
  );
};
