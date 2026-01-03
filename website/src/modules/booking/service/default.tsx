import React from 'react';
import { useServiceStorageData } from '@/modules/booking/service/use-service-storage-data.ts';
import { useStepperConfig } from '@/modules/booking/core/use-stepper-config.ts';
import { BookingStep } from '@/modules/booking/types.ts';
import { BookingLayout } from '@/modules/booking/core/booking-layout.tsx';
import { FormLayout } from '@/visual-components/form-layout/form-layout.tsx';
import { Button } from '@/visual-components/button/button.tsx';
import { useServiceTypes } from '@/modules/booking/service/use-service-types.ts';
import { CtaPictoLinkGrid } from '@/visual-components/cta-picto-link-grid/cta-picto-link-grid.tsx';
import { CtaPictoLink } from '@/visual-components/cta-picto-link/cta-picto-link.tsx';
import { SummaryCard } from '@/visual-components/summary-card/summary-card.tsx';
import { Typography } from '@/visual-components/typography/typography.tsx';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';

export const Default: React.FC = () => {
  const { hasBookableServiceConfigured, hasServiceConfigured, getServiceTypeData, setServiceTypeData } =
    useServiceStorageData();

  const stepperConfig = useStepperConfig(BookingStep.ServiceSelection);

  const { list: serviceTypes } = useServiceTypes();

  const chosenServices = serviceTypes.filter((service) => hasServiceConfigured(service.type));
  const notYetConfiguredServices = serviceTypes.filter((service) => !hasServiceConfigured(service.type));

  const canContinue = hasBookableServiceConfigured;

  return (
    <BookingLayout stepperConfig={stepperConfig}>
      <FormLayout
        descriptionBlock={
          <Typography variant="title-3" color="blue">
            Gewählte Dienstleistungen
          </Typography>
        }
        formElements={[
          <>
            {chosenServices.map((service) => {
              const data = getServiceTypeData(service.type);
              return (
                <SummaryCard
                  key={service.type}
                  title={service.title}
                  description={service.getServiceDescriptionText(data as any)}
                  onDismiss={() => {
                    setServiceTypeData(service.type, undefined);
                  }}
                />
              );
            })}
            {chosenServices.length === 0 && (
              <Typography color="grey">Es wurden noch keine Dienstleistungen ausgewählt.</Typography>
            )}
          </>,
          <>
            <Typography variant="title-3" color="blue">
              Weitere Dienstleistungen hinzufügen
            </Typography>
            <Spacer size="05" />
            <CtaPictoLinkGrid>
              {notYetConfiguredServices.map((service) => (
                <CtaPictoLink key={service.type} href={service.href} picto={service.picto} title={service.title} />
              ))}
            </CtaPictoLinkGrid>
          </>,
        ]}
        submitBlock={
          <Button type="submit" disabled={!canContinue}>
            Weiter
          </Button>
        }
      />
    </BookingLayout>
  );
};
