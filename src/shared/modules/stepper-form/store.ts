import { useRef, createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import { FormStep, StepFormSchema } from './types';

interface StepperStore {
  formSteps: FormStep<StepFormSchema>[];
  step: number;
  stepsLength: number;
  formSubmitting: boolean;
  toggleFormSubmitting: (value: boolean) => void;
  canGoBack: () => boolean;
  canGoNext: () => boolean;
  goNext: () => void;
  goBack: () => void;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  disabled: boolean;
  toggleDisabled: (value: boolean) => void;
}
type VanillaStepperStore = ReturnType<typeof createStepperStore>;
type StepperStoreSelector<T> = (store: StepperStore) => T;

const DEFAULT_STORE_SELECTOR: StepperStoreSelector<StepperStore> = (store) =>
  store;

export const createStepperStore = (
  stepsLength: number,
  formSteps: FormStep<StepFormSchema>[]
) =>
  createStore<StepperStore>()(
    devtools(
      (set, get) => ({
        formSteps,
        stepsLength,
        step: 0 as number,
        formSubmitting: false as boolean,
        toggleFormSubmitting: (value) => set({ formSubmitting: value }),
        canGoBack: () => get().step > 0,
        canGoNext: () => get().step < get().stepsLength - 1,
        goNext: () => {
          const canGoNext = get().canGoNext();
          set(({ step: prevStep }) => ({
            step: canGoNext ? prevStep + 1 : prevStep,
          }));
        },
        goBack: () => {
          const canGoBack = get().canGoBack();
          set(({ step: prevStep }) => ({
            step: canGoBack ? prevStep - 1 : prevStep,
          }));
        },
        isFirstStep: () => !get().canGoBack(),
        isLastStep: () => !get().canGoNext(),
        disabled: false,
        toggleDisabled: (value) => set({ disabled: value }),
      }),
      { name: 'stepper-form' }
    )
  );

export const StepperStoreContext = createContext<VanillaStepperStore | null>(
  null
);

export function useInitStepperStore(
  stepsLength: number,
  formSteps: FormStep<StepFormSchema>[]
) {
  const vanillaStepperStore = useRef<VanillaStepperStore>();
  if (!vanillaStepperStore.current) {
    vanillaStepperStore.current = createStepperStore(stepsLength, formSteps);
  }
  return vanillaStepperStore.current;
}

export function useStepperStoreContext() {
  const stepperStore = useContext(StepperStoreContext);
  if (stepperStore === null) {
    throw new Error(
      'useStepperStore seems to be used outside "StepperStoreProvider"'
    );
  }
  return stepperStore;
}

export function useStepperStore<T = StepperStore>(
  selector: StepperStoreSelector<T> = DEFAULT_STORE_SELECTOR as StepperStoreSelector<T>
) {
  const vanillaStore = useStepperStoreContext();
  return useStore(vanillaStore, selector);
}
