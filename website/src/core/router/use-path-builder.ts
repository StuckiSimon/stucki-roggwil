export const usePathBuilder = () => {
  return {
    aboutPath: () => '/about',
    contactPath: () => '/contact',
    homePath: () => '/',
    servicesPath: () => '/services',
    stockPath: () => '/stock',
    springExhibitionPath: () => '/spring-exhibition',
    allInclusiveLeasingPath: () => '/all-inclusive-leasing',
    vehicleRentPath: () => '/vehicle-rent',
    tireServicePath: () => '/tire-service',
    reasonsForPath: () => '/reasons-for',
    mechJobPath: () => '/mech-job',
    bookingPath: () => '/booking',
    adminPath: () => '/admin',
    adminBookingsPath: () => '/admin/bookings',
  };
};
