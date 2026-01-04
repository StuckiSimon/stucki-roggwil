import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputRadio } from '@/visual-components/input-radio/input-radio.tsx';
import { Fieldset } from '@/visual-components/fieldset/fieldset.tsx';
import { FormDescription } from '@/visual-components/form-description/form-description.tsx';
import { FormLayout } from '@/visual-components/form-layout/form-layout.tsx';
import { Button } from '@/visual-components/button/button.tsx';
import { useRouter } from 'next/navigation';
import { usePathBuilder } from '@/core/router/use-path-builder.ts';
import { useServiceStorageData } from '@/modules/booking/service/use-service-storage-data.ts';
import { BookingStep, VehicleServiceType } from '@/modules/booking/types.ts';
import { useStepperConfig } from '@/modules/booking/core/use-stepper-config.ts';
import { BookingLayout } from '@/modules/booking/core/booking-layout.tsx';
import { Link } from '@/visual-components/link/link.tsx';
import { ProcessNavigationLayout } from '@/visual-components/process-navigation-layout/process-navigation-layout.tsx';

const SERVICE_OPTIONS = [
  {
    label: 'Kleiner Service',
    value: VehicleServiceType.SmallService,
    subLabel: 'Grundlegende Wartungsarbeiten gemäss Herstellervorgaben wie Ölwechsel, Filter, etc.',
  },
  {
    label: 'Grosser Service',
    value: VehicleServiceType.LargeService,
    subLabel: 'Umfassendere Arbeiten sowie möglicher Austausch wichtiger Komponenten',
  },
  {
    label: 'Ich weiss es nicht',
    value: VehicleServiceType.Unknown,
    subLabel: 'Wir klären mit Ihnen den Umfang der erforderlichen Servicearbeiten ab',
  },
];

type FormValues = {
  serviceType: VehicleServiceType;
};

export const VehicleService: React.FC = () => {
  const { setVehicleServiceData } = useServiceStorageData();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const router = useRouter();
  const { bookingServicePath } = usePathBuilder();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setVehicleServiceData({ type: data.serviceType });
    router.push(bookingServicePath());
  };

  const stepperConfig = useStepperConfig(BookingStep.ServiceSelection);

  return (
    <BookingLayout stepperConfig={stepperConfig}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          descriptionBlock={
            <FormDescription
              title="Service"
              description="Regelmässige Wartung und Inspektion Ihres Fahrzeugs gemäss den Herstellervorgaben."
            />
          }
          formElements={[
            <Fieldset title="Welcher Service steht an?">
              {SERVICE_OPTIONS.map((option, i) => (
                <InputRadio
                  key={option.value}
                  {...register('serviceType', {
                    required: 'Bitte wählen Sie eine Option.',
                  })}
                  value={option.value}
                  label={option.label}
                  subLabel={option.subLabel}
                  error={i === SERVICE_OPTIONS.length - 1 ? errors.serviceType?.message : undefined}
                />
              ))}
            </Fieldset>,
          ]}
          submitBlock={
            <ProcessNavigationLayout
              left={<Link href={bookingServicePath()}>Zurück</Link>}
              right={<Button type="submit">Auswählen</Button>}
            />
          }
        />
      </form>
    </BookingLayout>
  );
};
