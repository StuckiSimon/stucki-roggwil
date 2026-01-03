import { useRouter } from 'next/navigation';
import { usePathBuilder } from '@/core/router/use-path-builder.ts';
import { BookingStep } from '@/modules/booking/types.ts';

const STEP_ORDER = [BookingStep.ServiceSelection, BookingStep.SlotSelection, BookingStep.CustomerDetails];

export function useStepperConfig(activeStep: BookingStep) {
  const router = useRouter();
  const { bookingServicePath } = usePathBuilder();

  const currentStepIndex = STEP_ORDER.indexOf(activeStep);

  const isServiceSelectionReached = currentStepIndex >= 0;
  const isSlotSelectionReached = currentStepIndex >= 1;
  const isCustomerDetailsReached = currentStepIndex >= 2;

  return [
    {
      label: 'Dienstleistung auswählen',
      isCompleted: currentStepIndex > 0,
      isActive: currentStepIndex === 0,
      onStepClick: isServiceSelectionReached
        ? () => {
            router.push(bookingServicePath());
          }
        : undefined,
    },
    {
      label: 'Termin festlegen',
      isCompleted: currentStepIndex > 1,
      isActive: currentStepIndex === 1,
      onStepClick: isSlotSelectionReached
        ? () => {
            // TODO: @Simon
            //router.push(bookingServicePath());
          }
        : undefined,
    },
    {
      label: 'Kontaktdaten angeben',
      isCompleted: currentStepIndex > 2,
      isActive: currentStepIndex === 2,
      onStepClick: isCustomerDetailsReached
        ? () => {
            // TODO: @Simon
            //router.push(bookingServicePath());
          }
        : undefined,
    },
  ];
}
