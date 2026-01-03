import { ServiceType } from '@/modules/booking/types.ts';
import { buildQueryParams } from '@/core/router/build-query-params.ts';
import { SearchParam } from '@/core/router/search-param.ts';

export const usePathBuilder = () => {
  return {
    aboutPath: () => '/about',
    adminBookingsPath: () => '/admin/bookings',
    adminPath: () => '/admin',
    allInclusiveLeasingPath: () => '/all-inclusive-leasing',
    bookingPath: () => '/booking',
    bookingServicePath: (serviceType?: ServiceType) =>
      `/booking/service${buildQueryParams([SearchParam.service, serviceType])}`,
    contactPath: () => '/contact',
    homePath: () => '/',
    mechJobPath: () => '/mech-job',
    reasonsForPath: () => '/reasons-for',
    servicesPath: () => '/services',
    springExhibitionPath: () => '/spring-exhibition',
    stockPath: () => '/stock',
    tireServicePath: () => '/tire-service',
    vehicleRentPath: () => '/vehicle-rent',
  };
};
