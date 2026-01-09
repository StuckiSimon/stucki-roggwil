import { usePathBuilder } from '@/core/router/use-path-builder';
import {
  ServiceStorageData,
  ServiceType,
  TireAction,
  TireCondition,
  TireLocation,
  TireType,
  VehicleServiceType,
} from '@/modules/booking/types';
import { PictogramVariant } from '@/visual-components/icon/icon-data.tsx';
import { ServiceTypeKeyMap, VEHICLE_CHECK_PACKAGE_OPTIONS } from '@/modules/booking/service/config.ts';

export type ServiceTypeConfiguration<T extends ServiceType> = {
  type: T;
  picto: PictogramVariant;
  href: string;
  title: string;
  description: string;
  getServiceDescriptionText: (data: Exclude<ServiceStorageData[ServiceTypeKeyMap[T]], undefined>) => string;
  getServiceDurationMinutes?: (data: Exclude<ServiceStorageData[ServiceTypeKeyMap[T]], undefined>) => number;
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
    getServiceDurationMinutes: () => {
      // Reserve sufficient time to be sure to be able to offer the slot, independent of what needs to be done
      return 360;
    },
  };

  const tireChangeConfig: ServiceTypeConfiguration<ServiceType.TireChange> = {
    type: ServiceType.TireChange,
    picto: 'picto-tire',
    href: bookingServicePath(ServiceType.TireChange),
    title: 'Radwechsel',
    description: 'Saisonaler Wechsel zwischen Sommer- und Winterreifen',
    getServiceDescriptionText: (data) => {
      let phrase = '';
      switch (data.tireLocation) {
        case TireLocation.Stored:
          phrase += 'Wir haben';
          break;
        case TireLocation.BringYourOwn:
          phrase += 'Sie bringen';
          break;
        case TireLocation.NeedNewTires:
          phrase += 'Sie benötigen';
          break;
      }
      switch (data.tireType) {
        case TireType.CompleteWheel:
          phrase += ' Kompletträder';
          break;
        case TireType.TireOnly:
          phrase += ' Reifen';
          break;
      }

      if (data.tireLocation !== TireLocation.NeedNewTires) {
        switch (data.tireCondition) {
          case TireCondition.Good:
            phrase += ' in gutem Zustand.';
            break;
          case TireCondition.Unsafe:
            phrase += ' in abgenutzem Zustand.';
            break;
          case TireCondition.Uncertain:
            break;
        }
      }

      phrase += ' Die derzeit montierten Reifen ';
      switch (data.tireAction) {
        case TireAction.CleanAndStore:
          phrase += ' sollen gereinigt und eingelagert werden.';
          break;
        case TireAction.TakeWithYou:
          phrase += ' werden von Ihnen mitgenommen.';
          break;
      }

      return phrase;
    },
    getServiceDurationMinutes: () => {
      return 60;
    },
  };

  const vehicleCheckConfig: ServiceTypeConfiguration<ServiceType.VehicleCheck> = {
    type: ServiceType.VehicleCheck,
    picto: 'picto-vehicle-check-list',
    href: bookingServicePath(ServiceType.VehicleCheck),
    title: 'Check',
    description: 'Saisonabhängige Checks – sicher unterwegs bei jedem Wetter',
    getServiceDescriptionText: (data) => {
      const packageConfig =
        VEHICLE_CHECK_PACKAGE_OPTIONS[VEHICLE_CHECK_PACKAGE_OPTIONS.findIndex((option) => option.value === data)];
      return packageConfig.label;
    },
    getServiceDurationMinutes: () => {
      return 60;
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
    getServiceDurationMinutes: () => {
      return 60;
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
