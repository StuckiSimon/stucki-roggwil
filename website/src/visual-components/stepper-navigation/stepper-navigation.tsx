import React from 'react';
import { Typography } from '../typography/typography';
import { Icon } from '../icon/icon';
import styles from './stepper-navigation.module.scss';

type Props = {
  steps: {
    label: string;
    isActive: boolean;
    isCompleted: boolean;
    onStepClick?: (stepIndex: number) => void;
  }[];
};

export const StepperNavigation: React.FC<Props> = ({ steps }) => {
  return (
    <nav aria-label="Schritt-Navigation">
      <ol className={styles.stepperList}>
        {steps.map((step, idx) => (
          <li key={idx} className={styles.stepperListItem}>
            <div className={styles.stepperIndicatorWrapper}>
              {idx < steps.length - 1 && <span className={styles.stepperConnector} />}
              <div className={styles.stepperIndicator}>
                {step.isCompleted ? (
                  <div className={styles.stepperCompletedCircle}>
                    <Icon variant="checkmark" size="32" />
                  </div>
                ) : step.isActive ? (
                  <div className={styles.stepperActiveCircle}>
                    <div className={styles.stepperActiveInnerCircle} />
                  </div>
                ) : (
                  <div className={styles.stepperInactiveCircle}>
                    <div className={styles.stepperInactiveInnerCircle} />
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              disabled={!step.onStepClick}
              aria-current={step.isActive ? 'step' : undefined}
              aria-disabled={!step.onStepClick}
              onClick={step.onStepClick ? () => step.onStepClick!(idx) : undefined}
              className={styles.stepperButton}
            >
              <Typography variant="sub-buttontext" color={step.isActive ? 'blue' : step.isCompleted ? 'black' : 'grey'}>
                {step.label}
              </Typography>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};
