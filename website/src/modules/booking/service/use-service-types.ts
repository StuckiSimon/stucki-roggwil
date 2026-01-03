import { usePathBuilder } from '@/core/router/use-path-builder';
import { ServiceStorageData, ServiceType, VehicleServiceType } from '@/modules/booking/types';
import { PictogramVariant } from '@/visual-components/icon/icon-data.tsx';
import { ServiceTypeKeyMap } from '@/modules/booking/service/config.ts';

export type ServiceTypeConfiguration<T extends ServiceType> = {
  type: T;
  picto: PictogramVariant;
  href: string;
  title: string;
  description: string;
  getServiceDescriptionText: (data: Exclude<ServiceStorageData[ServiceTypeKeyMap[T]], undefined>) => string;
};

export function useServiceTypes() {
  const { bookingServicePath } = usePathBuilder();

  const vehicleServiceConfig: ServiceTypeConfiguration<ServiceType.VehicleService> = {
    type: ServiceType.VehicleService,
    picto: 'picto-wrench-in-circle',
    href: bookingServicePath(ServiceType.VehicleService),
    title: 'Service',
    description: 'Regelmässige Wartung und Inspektion Ihres Fahrzeugs',
    getServiceDescriptionText: (data) => {
      switch (data.type) {
        case VehicleServiceType.SmallService:
          return 'Kleiner Service';
        case VehicleServiceType.LargeService:
          return 'Grosser Service';
        case VehicleServiceType.Unknown:
          return 'Umfang noch zu klären';
      }
    },
  };

  const tireChangeConfig: ServiceTypeConfiguration<ServiceType.TireChange> = {
    type: ServiceType.TireChange,
    picto: 'picto-tire',
    href: bookingServicePath(ServiceType.TireChange),
    title: 'Radwechsel',
    description: 'Saisonaler Wechsel zwischen Sommer- und Winterreifen',
    getServiceDescriptionText: (data) => {
      return '';
    },
  };

  const vehicleCheckConfig: ServiceTypeConfiguration<ServiceType.VehicleCheck> = {
    type: ServiceType.VehicleCheck,
    picto: 'picto-vehicle-check-list',
    href: bookingServicePath(ServiceType.VehicleCheck),
    title: 'Check',
    description: 'Saisonabhängige Checks – sicher unterwegs bei jedem Wetter',
    getServiceDescriptionText: (data) => {
      return '';
    },
  };

  const motorVehicleInspectionConfig: ServiceTypeConfiguration<ServiceType.MotorVehicleInspection> = {
    type: ServiceType.MotorVehicleInspection,
    picto: 'picto-vehicle-on-lift',
    href: bookingServicePath(ServiceType.MotorVehicleInspection),
    title: 'MFK-Prüfung',
    description: 'MFK-Prüfung gemäss Aufgebot des Strassenverkehrsamts',
    getServiceDescriptionText: (data) => {
      return 'Abklärungstermin';
    },
  };

  return {
    list: [vehicleServiceConfig, tireChangeConfig, vehicleCheckConfig, motorVehicleInspectionConfig] as const,
    map: {
      [ServiceType.VehicleService]: vehicleServiceConfig,
      [ServiceType.TireChange]: tireChangeConfig,
      [ServiceType.VehicleCheck]: vehicleCheckConfig,
      [ServiceType.MotorVehicleInspection]: motorVehicleInspectionConfig,
    },
  };
}
