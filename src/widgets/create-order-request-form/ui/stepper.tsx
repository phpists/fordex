import { Box, Step, StepLabel } from '@mui/material';
import StepperComponent from '@mui/material/Stepper';
import classes from './stepper.module.css';

interface Props {
  activeStep: number;
}

const steps = ['Schritt 1', 'Schritt 2', 'Schritt 3'];

export const Stepper = ({ activeStep }: Props) => {
  return (
    <Box className={classes.stepperWrapper}>
      <StepperComponent activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                {activeStep === index ? label : ''}
              </StepLabel>
            </Step>
          );
        })}
      </StepperComponent>
    </Box>
  );
};
