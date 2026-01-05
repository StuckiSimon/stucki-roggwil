import React from 'react';
import { FormDescription } from '@/visual-components/form-description/form-description.tsx';
import { FormLayout } from '@/visual-components/form-layout/form-layout.tsx';
import { Button } from '@/visual-components/button/button.tsx';
import { useRouter } from 'next/navigation';
import { usePathBuilder } from '@/core/router/use-path-builder.ts';
import { useServiceStorageData } from '@/modules/booking/service/use-service-storage-data.ts';
import { BookingStep } from '@/modules/booking/types.ts';
import { useStepperConfig } from '@/modules/booking/core/use-stepper-config.ts';
import { BookingLayout } from '@/modules/booking/core/booking-layout.tsx';
import { Typography } from '@/visual-components/typography/typography.tsx';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';
import { InformationBox } from '@/visual-components/information-box/information-box.tsx';
import { ProcessNavigationLayout } from '@/visual-components/process-navigation-layout/process-navigation-layout.tsx';
import { Link } from '@/visual-components/link/link.tsx';

export const MotorVehicleInspection: React.FC = () => {
  const { setMotorVehicleInspectionData } = useServiceStorageData();

  const router = useRouter();
  const { bookingServicePath } = usePathBuilder();

  const onSubmit = () => {
    setMotorVehicleInspectionData(true);
    router.push(bookingServicePath());
  };

  const stepperConfig = useStepperConfig(BookingStep.ServiceSelection);

  return (
    <BookingLayout stepperConfig={stepperConfig}>
      <form onSubmit={onSubmit}>
        <FormLayout
          descriptionBlock={
            <FormDescription title="MFK-Prüfung" description="MFK-Prüfung gemäss Aufgebot des Strassenverkehrsamts." />
          }
          formElements={[
            <Typography>
              Die MFK-Prüfung (Motorfahrzeugkontrolle) in unserer Garage umfasst eine gründliche Vorbereitung Ihres
              Fahrzeugs auf die amtliche Kontrolle. Wir überprüfen alle relevanten Komponenten, beheben festgestellte
              Mängel und sorgen dafür, dass Ihr Auto die Prüfung problemlos besteht.
            </Typography>,
            <Typography tag="span">
              Hierfür machen wir zwei Schritte:
              <Spacer size="03" />
              <ol>
                <li>
                  <Typography variant="buttontext" tag="span">
                    Vorbereitung
                  </Typography>{' '}
                  bis ca. 3 Wochen vor dem Termin machen wir einen einstündigen Termin ab, um Ihr Fahrzeug gründlich zu
                  überprüfen und notwendige Reparaturen einzuplanen.
                  <Spacer size="02" />
                </li>
                <li>
                  <Typography variant="buttontext" tag="span">
                    Durchführung Reparaturen und MFK
                  </Typography>{' '}
                  Nach der Vorbereitung vereinbaren wir einen weiteren Termin für die Reparaturen und die eigentliche
                  MFK-Prüfung beim Strassenverkehrsamt.
                </li>
              </ol>
            </Typography>,
            <InformationBox
              variant="info"
              title="Termin"
              description="Der Termin bezieht sich auf den Zeitpunkt der Vorbereitung. Die Durchführung der Reparaturen wird separat eingeplant."
            />,
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
