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
import { BookingStep, VehicleCheckPackage } from '@/modules/booking/types.ts';
import { useStepperConfig } from '@/modules/booking/core/use-stepper-config.ts';
import { BookingLayout } from '@/modules/booking/core/booking-layout.tsx';
import { Link } from '@/visual-components/link/link.tsx';
import { ProcessNavigationLayout } from '@/visual-components/process-navigation-layout/process-navigation-layout.tsx';
import { VEHICLE_CHECK_PACKAGE_OPTIONS } from '@/modules/booking/service/config.ts';

type FormValues = {
  package: VehicleCheckPackage;
};

export const VehicleCheck: React.FC = () => {
  const { setVehicleCheckData } = useServiceStorageData();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const router = useRouter();
  const { bookingServicePath } = usePathBuilder();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setVehicleCheckData(data.package);
    router.push(bookingServicePath());
  };

  const stepperConfig = useStepperConfig(BookingStep.ServiceSelection);

  return (
    <BookingLayout stepperConfig={stepperConfig}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          descriptionBlock={
            <FormDescription title="Fahrzeug-Check" description="Schnelle Kontrolle und Reinigung Ihres Fahrzeugs" />
          }
          formElements={[
            <Fieldset title="Welches Paket möchten Sie buchen?">
              {VEHICLE_CHECK_PACKAGE_OPTIONS.map((option, i) => (
                <InputRadio
                  key={option.value}
                  {...register('package', {
                    required: 'Bitte wählen Sie eine Option.',
                  })}
                  value={option.value}
                  label={option.label}
                  subLabel={option.subLabel}
                  sideLabel={option.price}
                  error={i === VEHICLE_CHECK_PACKAGE_OPTIONS.length - 1 ? errors.package?.message : undefined}
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
