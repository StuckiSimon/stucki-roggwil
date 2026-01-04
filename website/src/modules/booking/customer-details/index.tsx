'use client';
import React from 'react';
import { format } from 'date-fns';
import { FormLayout } from '@/visual-components/form-layout/form-layout.tsx';
import { Typography } from '@/visual-components/typography/typography.tsx';
import { ProcessNavigationLayout } from '@/visual-components/process-navigation-layout/process-navigation-layout.tsx';
import { Link } from '@/visual-components/link/link.tsx';
import { Button } from '@/visual-components/button/button.tsx';
import { BookingLayout } from '@/modules/booking/core/booking-layout.tsx';
import { useStepperConfig } from '@/modules/booking/core/use-stepper-config.ts';
import { BookingStep } from '@/modules/booking/types.ts';
import { useServiceStorageData } from '@/modules/booking/service/use-service-storage-data.ts';
import { usePathBuilder } from '@/core/router/use-path-builder.ts';
import { InputText } from '@/visual-components/input-text/input-text.tsx';
import { useForm } from 'react-hook-form';
import { FormSiblingLayout } from '@/visual-components/form-sibling-layout/form-sibling-layout.tsx';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';
import { InputTextarea } from '@/visual-components/input-textarea/input-textarea.tsx';
import { SummaryCardList } from '@/visual-components/summary-card-list/summary-card-list.tsx';
import { SummaryCard } from '@/visual-components/summary-card/summary-card.tsx';
import { useServiceTypes } from '@/modules/booking/service/use-service-types.ts';
import { useRouter } from 'next/navigation';
import { useSlotStorageData } from '@/modules/booking/slot/use-slot-storage-data.ts';
import { notNil } from '@/core/util/is-nil.ts';
import { InformationBox } from '@/visual-components/information-box/information-box.tsx';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment?: string;
  brand?: string;
  model?: string;
  licensePlate?: string;
};

export const Index: React.FC = () => {
  const { bookingSlotPath, bookingServicePath } = usePathBuilder();
  const stepperConfig = useStepperConfig(BookingStep.CustomerDetails);
  const { hasServiceConfigured, getServiceTypeData } = useServiceStorageData();
  const { serviceStorageData } = useSlotStorageData();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const { list: serviceTypes } = useServiceTypes();
  const router = useRouter();

  const chosenServices = serviceTypes.filter((service) => hasServiceConfigured(service.type));

  const onSubmit = (data: FormValues) => {
    // TODO: @Simon Integrate backend submit
  };

  return (
    <BookingLayout stepperConfig={stepperConfig}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          descriptionBlock={
            <Typography variant="title-3" color="blue">
              Kontaktdaten angeben
            </Typography>
          }
          formElements={[
            <>
              <Typography variant="sub-title">Angaben zur Person</Typography>
              <Spacer size="04" />
              <FormSiblingLayout
                left={
                  <InputText
                    label="Vorname"
                    {...register('firstName', {
                      required: 'Bitte Feld ausfüllen',
                      minLength: { value: 2, message: 'Bitte mindestens 2 Zeichen eingeben' },
                    })}
                    error={errors.firstName?.message}
                  />
                }
                right={
                  <InputText
                    label="Nachname"
                    {...register('lastName', {
                      required: 'Bitte Feld ausfüllen',
                      minLength: { value: 2, message: 'Bitte mindestens 2 Zeichen eingeben' },
                    })}
                    error={errors.lastName?.message}
                  />
                }
              />
            </>,
            <FormSiblingLayout
              left={
                <InputText
                  label="E-Mail"
                  {...register('email', {
                    required: 'Bitte Feld ausfüllen',
                    minLength: { value: 2, message: 'Bitte mindestens 2 Zeichen eingeben' },
                  })}
                  error={errors.email?.message}
                />
              }
              right={
                <InputText
                  label="Telefonnummer"
                  {...register('phone', {
                    required: 'Bitte Feld ausfüllen',
                    minLength: { value: 2, message: 'Bitte mindestens 2 Zeichen eingeben' },
                  })}
                  error={errors.phone?.message}
                />
              }
            />,
            <>
              <Typography variant="sub-title">Angaben zum Fahrzeug</Typography>
              <Spacer size="04" />
              <FormSiblingLayout
                left={
                  <InputText
                    label="Marke"
                    {...register('brand', {
                      required: 'Bitte Feld ausfüllen',
                      minLength: { value: 2, message: 'Bitte mindestens 2 Zeichen eingeben' },
                    })}
                    error={errors.brand?.message}
                  />
                }
                right={
                  <InputText
                    label="Modell"
                    {...register('model', {
                      required: 'Bitte Feld ausfüllen',
                      minLength: { value: 2, message: 'Bitte mindestens 2 Zeichen eingeben' },
                    })}
                    error={errors.model?.message}
                  />
                }
              />
            </>,
            <InputText
              label="Kennzeichen"
              placeholder="BE 1995"
              {...register('licensePlate', {
                required: 'Bitte Feld ausfüllen',
                minLength: { value: 3, message: 'Bitte mindestens 2 Zeichen eingeben' },
              })}
              error={errors.licensePlate?.message}
            />,
            <InputTextarea
              label="Zusätzliche Kommentare"
              placeholder="Müssen wir etwas Besonderes wissen?"
              {...register('comment')}
            />,
            <>
              <Typography variant="sub-title">Zusammenfassung</Typography>
              <Spacer size="04" />
              <SummaryCardList>
                {notNil(serviceStorageData) ? (
                  <SummaryCard
                    title="Gewählter Termin"
                    description={`Am ${format(serviceStorageData.date, 'dd.MM.yyyy')} um ${
                      serviceStorageData?.startHour
                    } Uhr`}
                    interaction={{
                      label: 'Ändern',
                      onClick: () => {
                        router.push(bookingSlotPath());
                      },
                    }}
                  />
                ) : null}
                {chosenServices.length > 0
                  ? chosenServices.map((service) => {
                      const data = getServiceTypeData(service.type);
                      return (
                        <SummaryCard
                          key={service.type}
                          title={service.title}
                          description={service.getServiceDescriptionText(data as never)}
                          interaction={{
                            label: 'Ändern',
                            onClick: () => {
                              router.push(bookingServicePath(service.type));
                            },
                          }}
                        />
                      );
                    })
                  : null}
              </SummaryCardList>
            </>,
            <InformationBox
              variant="info"
              title="Nächste Schritte"
              description="Wir werden uns nach der Buchung mit Ihnen für allfällige Rückfragen in Verbindung setzen."
            />,
          ]}
          submitBlock={
            <ProcessNavigationLayout
              left={<Link href={bookingSlotPath()}>Zurück</Link>}
              right={<Button type="submit">Termin buchen</Button>}
            />
          }
        />
      </form>
    </BookingLayout>
  );
};
