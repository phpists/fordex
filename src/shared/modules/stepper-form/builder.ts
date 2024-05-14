/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormStep, FormStepperBuilder } from './types';

const formStepperBuilder: FormStepperBuilder = {
  createStep: (step) => step,
};

export const createFormSteps = (
  builderFn: (builder: FormStepperBuilder) => FormStep<any>[]
) => builderFn(formStepperBuilder);
