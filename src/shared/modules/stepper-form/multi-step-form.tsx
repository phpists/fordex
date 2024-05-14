import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent, ReactNode, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStore } from 'zustand';

import { FormStep, StepFormSchema } from './types';
import { StepperStoreContext, useInitStepperStore } from './store';
import { MultiStepFormHandler } from './form-handler';
import { MultiStepFormStepContent } from './step-content';
import { FinalSubmitHandlerContext } from './final-submit-handler-context';

interface MultiStepFormProps {
  formSteps: FormStep<StepFormSchema>[];
  children: ReactNode;
  /**
   * Executes, when the last step is completed
   */
  onFullComplete?: () => void;
}

type MultiStepFormType = FunctionComponent<MultiStepFormProps> & {
  FormHandler: typeof MultiStepFormHandler;
  FormStepContent: typeof MultiStepFormStepContent;
};

const noop = () => null;

/**
 * Provider of multi step forms
 */
export const MultiStepForm: MultiStepFormType = ({
  children,
  formSteps,
  onFullComplete = noop,
}: MultiStepFormProps) => {
  const stepperStoreContextValue = useInitStepperStore(
    formSteps.length,
    formSteps
  );
  const { getDefaultValues, validationSchema } = useStore(
    stepperStoreContextValue,
    ({ step, formSteps }) => formSteps[step]
  );

  const formConfig = useMemo(
    () => ({
      shouldUnregister: false,
      resolver: zodResolver(validationSchema),
      defaultValues: getDefaultValues(),
      values: getDefaultValues(),
      shouldUseNativeValidation: false,
    }),
    [getDefaultValues, validationSchema]
  );

  const form = useForm(formConfig);

  return (
    <FinalSubmitHandlerContext.Provider value={onFullComplete}>
      <StepperStoreContext.Provider value={stepperStoreContextValue}>
        <FormProvider {...form}>{children}</FormProvider>
      </StepperStoreContext.Provider>
    </FinalSubmitHandlerContext.Provider>
  );
};

MultiStepForm.FormHandler = MultiStepFormHandler;
MultiStepForm.FormStepContent = MultiStepFormStepContent;
