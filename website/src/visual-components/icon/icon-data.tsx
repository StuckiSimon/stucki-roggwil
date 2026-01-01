import React from 'react';

export type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export type IconVariant = 'checkmark' | 'chevron-right';
export type PictogramVariant =
  | 'picto-tire'
  | 'picto-vehicle-check-list'
  | 'picto-vehicle-on-lift'
  | 'picto-wrench-in-circle';

const Checkmark = React.lazy(() => import('./assets/checkmark.tsx'));
const ChevronRight = React.lazy(() => import('./assets/chevron-right.tsx'));
const PictoTire = React.lazy(() => import('./assets/picto-tire.tsx'));
const PictoVehicleCheckList = React.lazy(() => import('./assets/picto-vehicle-check-list.tsx'));
const PictoVehicleOnLift = React.lazy(() => import('./assets/picto-vehicle-on-lift.tsx'));
const PictoWrenchInCircle = React.lazy(() => import('./assets/picto-wrench-in-circle.tsx'));

export const ICON_TYPE_COMPONENT_MAP: Record<IconVariant | PictogramVariant, SVGComponent> = {
  checkmark: Checkmark,
  'chevron-right': ChevronRight,
  'picto-tire': PictoTire,
  'picto-vehicle-check-list': PictoVehicleCheckList,
  'picto-vehicle-on-lift': PictoVehicleOnLift,
  'picto-wrench-in-circle': PictoWrenchInCircle,
};
