import { ServiceStorageData, ServiceType, VehicleCheckPackage } from '@/modules/booking/types.ts';

export const SERVICE_TYPE_KEY_MAP = {
  [ServiceType.VehicleService]: 'vehicleService',
  [ServiceType.TireChange]: 'tireChange',
  [ServiceType.VehicleCheck]: 'vehicleCheck',
  [ServiceType.MotorVehicleInspection]: 'motorVehicleInspection',
} as const satisfies Record<ServiceType, keyof ServiceStorageData>;

export type ServiceTypeKeyMap = typeof SERVICE_TYPE_KEY_MAP;

export const VEHICLE_CHECK_PACKAGE_OPTIONS = [
  {
    label: 'Feriencheck',
    value: VehicleCheckPackage.FK,
    subLabel: 'Technische Kontrolle aller wichtigen Funktionen und Niveaus',
    price: 'Fr. 59.–',
  },
  /*{
    label: 'Unterbodenwäsche',
    value: VehicleCheckPackage.CHRE,
    subLabel: 'Unterboden abdampfen, Fahrzeug waschen',
    price: 'Fr. 69.–',
  },*/
  {
    label: 'Feriencheck inkl. Waschen',
    value: VehicleCheckPackage.FKWASCH,
    subLabel: 'Feriencheck und Fahrzeug waschen',
    price: 'Fr. 74.–',
  },
  /*{
    label: 'Feriencheck inkl. Unterbodenwäsche',
    value: VehicleCheckPackage.FKCHRE,
    subLabel: 'Feriencheck inkl. Unterbodenwäsche und Fahrzeug waschen',
    price: 'Fr. 128.–',
  },*/
  {
    label: 'Frühlingsputz Light',
    value: VehicleCheckPackage.FPLIGHT,
    subLabel: 'grobe Innenreinigung, Fahrzeug waschen, Türfälze reinigen',
    price: 'Fr. 79.–',
  },
  {
    label: 'Frühlingsputz Standard',
    value: VehicleCheckPackage.FPSTANDARD,
    subLabel: 'Feriencheck, Innenreinigung, Fahrzeug waschen, Türfälze reinigen',
    price: 'Fr. 119.–',
  },
  {
    label: 'Frühlingsputz Spezial',
    value: VehicleCheckPackage.FPSPEZ,
    subLabel: 'Feriencheck, Innenreinigung, Fahrzeug waschen, Türfälze reinigen, Unterboden und Motorraum abdampfen',
    price: 'Fr. 199.–',
  },
  {
    label: 'Frühlingsputz Luxus',
    value: VehicleCheckPackage.FPLUX,
    subLabel:
      'Feriencheck, Innenreinigung, Fahrzeug waschen, Türfälze reinigen, Unterboden und Motorraum abdampfen, Polieren und Einwachsen des Lackes',
    price: 'ab Fr. 299.–',
  },
];
