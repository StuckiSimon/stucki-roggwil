import { ServiceType } from '@/modules/booking/types.ts';

export const usePathBuilder = () => {
  return {
    aboutPath: () => '/about',
    adminBookingsPath: () => '/admin/bookings',
    adminPath: () => '/admin',
    allInclusiveLeasingPath: () => '/all-inclusive-leasing',
    bookingPath: () => '/booking',
    bookingServicePath: (serviceType: ServiceType) =>
      `/booking/service?${new URLSearchParams({ service: serviceType })}`,
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
