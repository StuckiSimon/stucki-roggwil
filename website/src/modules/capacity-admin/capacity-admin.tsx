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
import { addDays, format, startOfWeek } from 'date-fns';
import { Button } from '@/visual-components/button/button';
import { Spacer } from '@/visual-components/spacer/spacer';
import { Typography } from '@/visual-components/typography/typography';
import useLocalStorage from '@/core/storage/use-local-storage';
import { StorageKey } from '@/core/storage/storage-key';
import styles from './capacity-admin.module.scss';

const MAX_WEEKS_AHEAD = 12;

function getNextFreeWeekStart(capacities: Capacity[]): Date | null {
  const weekStarts = new Set(
    capacities.map((c) => format(startOfWeek(new Date(c.date), { weekStartsOn: 1 }), 'yyyy-MM-dd')),
  );
  let current = startOfWeek(new Date(), { weekStartsOn: 1 });
  for (let i = 0; i < MAX_WEEKS_AHEAD; i++) {
    const key = format(current, 'yyyy-MM-dd');
    if (!weekStarts.has(key)) {
      return current;
    }
    current = addDays(current, 7);
  }

  return null;
}

export const CapacityAdmin: React.FC = () => {
  const { hasSetAdminPassword } = useAdminPassword();

  const { data: capacitiesData, isLoading: isCapacitiesLoading, error: capacitiesError, mutate } = useCapacities();
  const { trigger: postCapacities } = usePostCapacities();

  const weeks = getWeeksForDates<Capacity>(capacitiesData?.capacities ?? [], (date) => ({
    date,
    bookedHours: 0,
    capacityHours: 0,
  }));

  const hasAddableWeek = React.useMemo(() => {
    if (!capacitiesData) {
      return false;
    }
    const nextWeekStart = getNextFreeWeekStart(capacitiesData.capacities);
    return nextWeekStart !== null;
  }, [capacitiesData]);

  const [newWeekCapacity, setNewWeekCapacity] = useLocalStorage(StorageKey.DailyCapacity, '0');

  const handleAddWeek = async () => {
    if (!capacitiesData) {
      return;
    }

    const nextWeekStart = getNextFreeWeekStart(capacitiesData.capacities);
    if (!nextWeekStart) {
      return;
    }

    let workDayCapacity = parseFloat(newWeekCapacity);
    if (isNaN(workDayCapacity) || workDayCapacity < 0) {
      workDayCapacity = 0;
    }

    const newCapacities: Capacity[] = [];
    for (let i = 0; i < 7; i++) {
      const date = format(addDays(nextWeekStart, i), 'yyyy-MM-dd');
      const dayOfWeek = addDays(nextWeekStart, i).getDay();
      const isWorkDay = dayOfWeek >= 1 && dayOfWeek <= 5;

      newCapacities.push({
        date,
        bookedHours: 0,
        capacityHours: isWorkDay ? workDayCapacity : 0,
      });
    }

    await postCapacities(newCapacities);
    await mutate();
  };

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
                const onCapacityHoursChange = async (hours: number) => {
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
                    onCapacityHoursChange={onCapacityHoursChange}
                  />
                );
              }) as WeekChildren,
            };
          })}
        />
      </GridItem>
      <GridItem>
        {hasAddableWeek ? (
          <>
            <Spacer size="07" />
            <div className={styles.addWeekRow}>
              <Button type="button" onClick={handleAddWeek}>
                Neue Woche hinzufügen
              </Button>
              <input
                value={newWeekCapacity}
                onChange={(e) => setNewWeekCapacity(e.target.value)}
                className={styles.capacityInput}
                aria-label="Kapazität für Werktage (h)"
                title="Kapazität für Werktage (h)"
              />
              <Typography color="grey">h / Werktag</Typography>
            </div>
          </>
        ) : null}
        <Spacer size="08" />
      </GridItem>
    </GridContainer>
  );
};
