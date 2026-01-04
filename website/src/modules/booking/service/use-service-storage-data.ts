import useLocalStorage from '@/core/storage/use-local-storage.ts';
import { StorageKey } from '@/core/storage/storage-key.ts';
import { ServiceStorageData, ServiceType } from '@/modules/booking/types.ts';
import { notNil } from '@/core/util/is-nil.ts';
import { useEffect } from 'react';
import { SERVICE_TYPE_KEY_MAP, ServiceTypeKeyMap } from '@/modules/booking/service/config.ts';
import { useServiceTypes } from '@/modules/booking/service/use-service-types.ts';

// Maximum age of stored data: 7 days
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

export function useServiceStorageData() {
  const { list } = useServiceTypes();
  const [serviceStorageData, setServiceStorageData] = useLocalStorage<ServiceStorageData>(StorageKey.BookingService, {
    initialSetDate: new Date().toISOString(),
  });

  const initialSetDateString = serviceStorageData.initialSetDate;
  useEffect(() => {
    const isStorageDataOld = new Date().getTime() - new Date(initialSetDateString).getTime() > MAX_AGE_MS;
    if (isStorageDataOld) {
      setServiceStorageData({
        initialSetDate: new Date().toISOString(),
      });
    }
  }, [initialSetDateString, setServiceStorageData]);

  function setServiceTypeData<T extends ServiceType>(
    serviceType: T,
    data: ServiceStorageData[(typeof SERVICE_TYPE_KEY_MAP)[T]] | undefined,
  ) {
    const key = SERVICE_TYPE_KEY_MAP[serviceType];
    setServiceStorageData({
      ...serviceStorageData,
      [key]: data,
    });
  }

  function getServiceTypeData<T extends ServiceType>(
    serviceType: T,
  ): ServiceStorageData[ServiceTypeKeyMap[T]] | undefined {
    const key = SERVICE_TYPE_KEY_MAP[serviceType];
    return serviceStorageData?.[key];
  }

  const hasBookableServiceConfigured =
    notNil(serviceStorageData?.vehicleService) ||
    notNil(serviceStorageData?.tireChange) ||
    notNil(serviceStorageData?.vehicleCheck) ||
    notNil(serviceStorageData?.motorVehicleInspection);

  return {
    hasBookableServiceConfigured,
    getServiceTypeData,
    setServiceTypeData,
    hasServiceConfigured: (serviceType: ServiceType) => {
      const key = SERVICE_TYPE_KEY_MAP[serviceType];
      return notNil(serviceStorageData?.[key]);
    },
    setVehicleServiceData: (data: ServiceStorageData['vehicleService'] | undefined) => {
      setServiceTypeData(ServiceType.VehicleService, data);
    },
    setTireChangeData: (data: ServiceStorageData['tireChange'] | undefined) => {
      setServiceTypeData(ServiceType.TireChange, data);
    },
    setVehicleCheckData: (data: ServiceStorageData['vehicleCheck'] | undefined) => {
      setServiceTypeData(ServiceType.VehicleCheck, data);
    },
    setMotorVehicleInspectionData: (data: ServiceStorageData['motorVehicleInspection'] | undefined) => {
      setServiceTypeData(ServiceType.MotorVehicleInspection, data);
    },
    getSelectedServiceDuration: () => {
      return list.reduce((totalDuration, service) => {
        const data = getServiceTypeData(service.type);
        if (data && service.getServiceDurationMinutes) {
          return totalDuration + service.getServiceDurationMinutes(data as never);
        }
        return totalDuration;
      }, 0);
    },
  };
}
