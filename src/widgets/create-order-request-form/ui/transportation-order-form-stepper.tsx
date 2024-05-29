import { Button, MobileStepper, styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useStepperStore } from 'shared/modules';
import { TRANSPORTATION_ORDER_STEPS_TEXTS } from '../model/transportation-order-steps';

const StyledStepper = styled(MobileStepper)`
  & .MuiMobileStepper-dot {
    transition: all 0.3w;
    display: none;
  }
  & .MuiMobileStepper-dotActive {
    width: 30px;
    border-radius: 4px;
  }
`;

interface TransportationOrderFormStepperProps {
  onCancelClick: () => void;
}

export const TransportationOrderFormStepper = ({
  onCancelClick,
}: TransportationOrderFormStepperProps) => {
  const {
    step: activeStep,
    formSubmitting,
    stepsLength,
    goBack,
    isFirstStep,
    isLastStep,
    disabled,
  } = useStepperStore();

  return (
    <StyledStepper
      variant="dots"
      position="static"
      steps={stepsLength}
      activeStep={activeStep}
      sx={{ flexGrow: 1, padding: 0 }}
      backButton={
        <Button
          type="button"
          disabled={formSubmitting}
          color={isFirstStep() ? 'error' : 'secondary'}
          startIcon={isFirstStep() ? undefined : <ChevronLeftIcon />}
          onClick={isFirstStep() ? onCancelClick : goBack}
        >
          {isFirstStep() ? 'Abbrechen' : 'Zurück'}
        </Button>
      }
      nextButton={
        <LoadingButton
          disabled={formSubmitting || disabled}
          loading={formSubmitting}
          variant="contained"
          type="submit"
          color={isLastStep() ? 'success' : undefined}
        >
          {TRANSPORTATION_ORDER_STEPS_TEXTS[activeStep].nextStepButtonTitle}
        </LoadingButton>
      }
    />
  );
};
