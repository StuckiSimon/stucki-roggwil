'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchParam } from '@/core/router/search-param.ts';
import { ServiceType } from '@/modules/booking/types.ts';
import { VehicleService } from '@/modules/booking/service/vehicle-service.tsx';
import { Default } from '@/modules/booking/service/default.tsx';

export const Index: React.FC = () => {
  const params = useSearchParams();
  const serviceType = params.get(SearchParam.service);

  switch (serviceType) {
    case ServiceType.VehicleService:
      return <VehicleService />;
    default:
      return <Default />;
  }
};
