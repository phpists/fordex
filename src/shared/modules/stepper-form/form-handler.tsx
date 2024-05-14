import { PropsWithChildren, forwardRef, useCallback, useContext } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useFormContext } from 'react-hook-form';

import { useStepperStore } from './store';
import { StepFormSchema, StepFormValues } from './types';
import { FinalSubmitHandlerContext } from './final-submit-handler-context';

interface StepperFormProps extends PropsWithChildren {
  sx?: SxProps<Theme>;
}

/**
 * Provides a 'form' component with
 * subscriptions from MultiStepFormProvider
 */
export const MultiStepFormHandler = forwardRef<
  HTMLFormElement,
  StepperFormProps
>(function MultiStepFormHandler({ sx, children }, ref) {
  const finalSubmitHandler = useContext(FinalSubmitHandlerContext);
  const {
    goNext,
    toggleFormSubmitting,
    onStepFormSubmit,
    onStepComplete,
    onStepError,
    canGoNext,
  } = useStepperStore(
    useShallow(
      ({ goNext, toggleFormSubmitting, canGoNext, step, formSteps }) => ({
        goNext,
        toggleFormSubmitting,
        onStepFormSubmit: formSteps[step].onSubmit,
        onStepComplete: formSteps[step].onComplete,
        onStepError: formSteps[step].onError,
        canGoNext,
      })
    )
  );

  const { handleSubmit, reset } = useFormContext();
  const onSubmit = useCallback(
    async (data: StepFormValues<StepFormSchema>) => {
      try {
        toggleFormSubmitting(true);
        await onStepFormSubmit(data);
        if (!canGoNext()) {
          reset();
          finalSubmitHandler();
        }

        goNext();
        onStepComplete?.(data);
      } catch (e) {
        onStepError?.(e);
        // eslint-disable-next-line no-console
        console.log('form step error', e);
      } finally {
        toggleFormSubmitting(false);
      }
    },
    [
      canGoNext,
      finalSubmitHandler,
      goNext,
      onStepComplete,
      onStepError,
      onStepFormSubmit,
      reset,
      toggleFormSubmitting,
    ]
  );

  return (
    <Box
      ref={ref}
      tabIndex={0}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={sx}
    >
      {children}
    </Box>
  );
});
