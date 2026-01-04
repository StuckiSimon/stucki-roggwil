'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchParam } from '@/core/router/search-param.ts';
import { ServiceType } from '@/modules/booking/types.ts';
import { Default } from '@/modules/booking/service/default.tsx';
import { VehicleService } from '@/modules/booking/service/vehicle-service.tsx';
import { TireChange } from '@/modules/booking/service/tire-change.tsx';
import { VehicleCheck } from '@/modules/booking/service/vehicle-check.tsx';
import { MotorVehicleInspection } from '@/modules/booking/service/motor-vehicle-inspection.tsx';

export const Index: React.FC = () => {
  const params = useSearchParams();
  const serviceType = params.get(SearchParam.service);

  switch (serviceType) {
    case ServiceType.VehicleService:
      return <VehicleService />;
    case ServiceType.TireChange:
      return <TireChange />;
    case ServiceType.VehicleCheck:
      return <VehicleCheck />;
    case ServiceType.MotorVehicleInspection:
      return <MotorVehicleInspection />;
    default:
      return <Default />;
  }
};
