import { ServiceStorageData, ServiceType } from '@/modules/booking/types.ts';

export const SERVICE_TYPE_KEY_MAP = {
  [ServiceType.VehicleService]: 'vehicleService',
  [ServiceType.TireChange]: 'tireChange',
  [ServiceType.VehicleCheck]: 'vehicleCheck',
  [ServiceType.MotorVehicleInspection]: 'motorVehicleInspection',
} as const satisfies Record<ServiceType, keyof ServiceStorageData>;

export type ServiceTypeKeyMap = typeof SERVICE_TYPE_KEY_MAP;
