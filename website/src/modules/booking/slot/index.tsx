'use client';
import React, { useEffect } from 'react';
import { FormLayout } from '@/visual-components/form-layout/form-layout.tsx';
import { Typography } from '@/visual-components/typography/typography.tsx';
import { ProcessNavigationLayout } from '@/visual-components/process-navigation-layout/process-navigation-layout.tsx';
import { Link } from '@/visual-components/link/link.tsx';
import { Button, ButtonLink } from '@/visual-components/button/button.tsx';
import { BookingLayout } from '@/modules/booking/core/booking-layout.tsx';
import { useStepperConfig } from '@/modules/booking/core/use-stepper-config.ts';
import { BookingStep } from '@/modules/booking/types.ts';
import { useServiceStorageData } from '@/modules/booking/service/use-service-storage-data.ts';
import { usePathBuilder } from '@/core/router/use-path-builder.ts';
import { useSlots } from '@/modules/worker/use-slots.ts';
import { getFirstAvailableDate } from '@/modules/booking/slot/get-first-available-date.ts';
import { SlotCalendar } from '@/modules/booking/slot/slot-calendar';
import { format } from 'date-fns';
import isNil from '@/core/util/is-nil.ts';
import { useSlotStorageData } from '@/modules/booking/slot/use-slot-storage-data.ts';

export const Index: React.FC = () => {
  const { bookingServicePath, bookingDataPath } = usePathBuilder();
  const stepperConfig = useStepperConfig(BookingStep.SlotSelection);
  const { getSelectedServiceDuration } = useServiceStorageData();

  const { serviceStorageData, setServiceStorageData: setSelectedSlot } = useSlotStorageData();

  const duration = getSelectedServiceDuration();

  const { data: slotsData } = useSlots(Math.ceil(duration / 60));

  const slots = slotsData?.slots || [];

  const [activeDay, setActiveDay] = React.useState<Date | null>(null);
  const selectedSlot = serviceStorageData;

  useEffect(() => {
    const firstAvailableDate = getFirstAvailableDate(slots);
    setActiveDay(firstAvailableDate);
  }, [slots]);

  useEffect(() => {
    if (activeDay) {
      const dayStr = format(activeDay, 'yyyy-MM-dd');
      const firstSlotOfDay = slots.find((slot) => slot.date === dayStr) ?? null;
      setSelectedSlot(firstSlotOfDay);
    }
  }, [activeDay, slots]);

  return (
    <BookingLayout stepperConfig={stepperConfig}>
      <FormLayout
        descriptionBlock={
          <Typography variant="title-3" color="blue">
            Termin festlegen
          </Typography>
        }
        formElements={[
          <SlotCalendar
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            slots={slots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />,
        ]}
        submitBlock={
          <ProcessNavigationLayout
            left={<Link href={bookingServicePath()}>Zurück</Link>}
            right={
              isNil(selectedSlot) ? (
                <Button disabled>Weiter</Button>
              ) : (
                <ButtonLink href={bookingDataPath()}>Weiter</ButtonLink>
              )
            }
          />
        }
      />
    </BookingLayout>
  );
};
