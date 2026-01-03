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
import { BookingStep, TireAction, TireCondition, TireLocation, TireType } from '@/modules/booking/types.ts';
import { useStepperConfig } from '@/modules/booking/core/use-stepper-config.ts';
import { BookingLayout } from '@/modules/booking/core/booking-layout.tsx';

const TIRE_LOCATION_OPTIONS = [
  {
    label: 'Bei uns eingelagert',
    value: TireLocation.Stored,
  },
  {
    label: 'Eigene Reifen mitbringen',
    value: TireLocation.BringYourOwn,
  },
  {
    label: 'Neuer Reifensatz',
    value: TireLocation.NeedNewTires,
  },
];

const TIRE_TYPE_OPTIONS = [
  {
    label: 'Kompletträder',
    subLabel: 'Sie besitzen 2 Sets an Felgen, es muss lediglich das Rad gewechselt werden.',
    value: TireType.CompleteWheel,
  },
  {
    label: 'Nur Reifen',
    subLabel: 'Sie besitzen 1 Set an Felgen, die Pneus müssen neu auf die Felgen aufgezogen werden.',
    value: TireType.TireOnly,
  },
];

const TIRE_CONDITION_OPTIONS = [
  {
    label: 'Reifen in gutem Zustand',
    value: TireCondition.Good,
  },
  {
    label: 'Reifen unsicher',
    value: TireCondition.Unsafe,
  },
  {
    label: 'Ich bin unsicher',
    value: TireCondition.Uncertain,
  },
];

const TIRE_ACTION_OPTIONS = [
  {
    label: 'Reifen reinigen und einlagern',
    value: TireAction.CleanAndStore,
  },
  {
    label: 'Reifen mitnehmen',
    value: TireAction.TakeWithYou,
  },
  {
    label: 'Reifen entsorgen',
    value: TireAction.Dispose,
  },
];

type FormValues = {
  tireLocation: TireLocation;
  tireType: TireType;
  tireCondition: TireCondition;
  tireAction: TireAction;
};

export const TireChange: React.FC = () => {
  const { setTireChangeData } = useServiceStorageData();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const router = useRouter();
  const { bookingServicePath } = usePathBuilder();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setTireChangeData(data);
    router.push(bookingServicePath());
  };

  const stepperConfig = useStepperConfig(BookingStep.ServiceSelection);

  return (
    <BookingLayout stepperConfig={stepperConfig}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          descriptionBlock={
            <FormDescription
              title="Radwechsel"
              description="Rad- oder Reifenwechsel für Ihr Fahrzeug durchführen lassen."
            />
          }
          formElements={[
            <Fieldset title="Wo befinden sich Ihre Reifen?">
              {TIRE_LOCATION_OPTIONS.map((option, i) => (
                <InputRadio
                  key={option.value}
                  {...register('tireLocation', {
                    required: 'Bitte wählen Sie eine Option.',
                  })}
                  value={option.value}
                  label={option.label}
                  error={i === TIRE_LOCATION_OPTIONS.length - 1 ? errors.tireLocation?.message : undefined}
                />
              ))}
            </Fieldset>,
            <Fieldset title="Welcher Typ Reifen?">
              {TIRE_TYPE_OPTIONS.map((option, i) => (
                <InputRadio
                  key={option.value}
                  {...register('tireType', {
                    required: 'Bitte wählen Sie eine Option.',
                  })}
                  value={option.value}
                  label={option.label}
                  subLabel={option.subLabel}
                  error={i === TIRE_TYPE_OPTIONS.length - 1 ? errors.tireType?.message : undefined}
                />
              ))}
            </Fieldset>,
            <Fieldset title="In welchem Zustand sind Ihre Reifen?">
              {TIRE_CONDITION_OPTIONS.map((option, i) => (
                <InputRadio
                  key={option.value}
                  {...register('tireCondition', {
                    required: 'Bitte wählen Sie eine Option.',
                  })}
                  value={option.value}
                  label={option.label}
                  error={i === TIRE_CONDITION_OPTIONS.length - 1 ? errors.tireCondition?.message : undefined}
                />
              ))}
            </Fieldset>,
            <Fieldset title="Was soll mit Ihren Reifen nach dem Wechsel geschehen?">
              {TIRE_ACTION_OPTIONS.map((option, i) => (
                <InputRadio
                  key={option.value}
                  {...register('tireAction', {
                    required: 'Bitte wählen Sie eine Option.',
                  })}
                  value={option.value}
                  label={option.label}
                  error={i === TIRE_ACTION_OPTIONS.length - 1 ? errors.tireAction?.message : undefined}
                />
              ))}
            </Fieldset>,
          ]}
          submitBlock={<Button type="submit">Weiter</Button>}
        />
      </form>
    </BookingLayout>
  );
};
