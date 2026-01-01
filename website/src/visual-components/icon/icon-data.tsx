import React from 'react';

export type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export type IconVariant = 'checkmark';
export type PictogramVariant = 'picto-wrench-in-circle';

const Checkmark = React.lazy(() => import('./assets/checkmark.tsx'));
const PictoWrenchInCircle = React.lazy(() => import('./assets/picto-wrench-in-circle.tsx'));

export const ICON_TYPE_COMPONENT_MAP: Record<IconVariant | PictogramVariant, SVGComponent> = {
  checkmark: Checkmark,
  'picto-wrench-in-circle': PictoWrenchInCircle,
};
