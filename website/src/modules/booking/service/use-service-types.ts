import { usePathBuilder } from '@/core/router/use-path-builder';
import { ServiceType } from '@/modules/booking/types';
import { PictogramVariant } from '@/visual-components/icon/icon-data.tsx';

export type ServiceTypeConfiguration = {
  type: ServiceType;
  picto: PictogramVariant;
  href: string;
  title: string;
  description: string;
};

export function useServiceTypes(): ServiceTypeConfiguration[] {
  const { bookingServicePath } = usePathBuilder();

  return [
    {
      type: ServiceType.VehicleService,
      picto: 'picto-wrench-in-circle',
      href: bookingServicePath(ServiceType.VehicleService),
      title: 'Service',
      description: 'Regelmässige Wartung und Inspektion Ihres Fahrzeugs',
    },
    {
      type: ServiceType.TireChange,
      picto: 'picto-tire',
      href: bookingServicePath(ServiceType.TireChange),
      title: 'Radwechsel',
      description: 'Saisonaler Wechsel zwischen Sommer- und Winterreifen',
    },
    {
      type: ServiceType.VehicleCheck,
      picto: 'picto-vehicle-check-list',
      href: bookingServicePath(ServiceType.VehicleCheck),
      title: 'Check',
      description: 'Saisonabhängige Checks – sicher unterwegs bei jedem Wetter',
    },
    {
      type: ServiceType.MotorVehicleInspection,
      picto: 'picto-vehicle-on-lift',
      href: bookingServicePath(ServiceType.MotorVehicleInspection),
      title: 'MFK-Prüfung',
      description: 'MFK-Prüfung gemäss Aufgebot des Strassenverkehrsamts',
    },
  ];
}
