import React, { ComponentProps } from 'react';
import { Header } from '@/modules/booking/core/header.tsx';
import { GridContainer, GridItem } from '@/visual-components/grid/grid.tsx';
import { StepperNavigation } from '@/visual-components/stepper-navigation/stepper-navigation.tsx';

type Props = {
  children: React.ReactNode;
  stepperConfig: ComponentProps<typeof StepperNavigation>['steps'];
};

export const BookingLayout: React.FC<Props> = ({ children, stepperConfig }) => {
  return (
    <GridContainer>
      <Header />
      <GridItem span="4">
        <StepperNavigation steps={stepperConfig} />
      </GridItem>
      <GridItem span="6">{children}</GridItem>
    </GridContainer>
  );
};
