export enum BookingStep {
  ServiceSelection = 'service-selection',
  SlotSelection = 'slot-selection',
  CustomerDetails = 'customer-details',
}

export enum ServiceType {
  VehicleService = 'vehicle-service',
  TireChange = 'tire-change',
  VehicleCheck = 'vehicle-check',
  MotorVehicleInspection = 'motor-vehicle-inspection',
}

export enum VehicleServiceType {
  SmallService = 'smallService',
  LargeService = 'largeService',
  Unknown = 'unknown',
}

export enum TireLocation {
  Stored = 'stored',
  BringYourOwn = 'bringYourOwn',
  NeedNewTires = 'needNewTires',
}

export enum TireType {
  CompleteWheel = 'completeWheel',
  TireOnly = 'tireOnly',
}

export enum TireCondition {
  Good = 'good',
  Unsafe = 'unsafe',
  Uncertain = 'uncertain',
}

export enum TireAction {
  CleanAndStore = 'cleanAndStore',
  TakeWithYou = 'takeWithYou',
  Dispose = 'dispose',
}

export enum VehicleCheckPackage {
  FK = 'fk',
  CHRE = 'chre',
  FKWASCH = 'fkwasch',
  FKCHRE = 'fkchre',
  FPLIGHT = 'fplight',
  FPSTANDARD = 'fpstandard',
  FPSPEZ = 'fpspez',
  FPLUX = 'fplux',
}

export type ServiceStorageData = {
  initialSetDate: string;
  vehicleService?: {
    type: VehicleServiceType;
  };
  vehicleCheck?: VehicleCheckPackage;
  motorVehicleInspection?: boolean;
  tireChange?: {
    tireLocation: TireLocation;
    tireType: TireType;
    tireCondition: TireCondition;
    tireAction: TireAction;
  };
};
