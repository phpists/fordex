import { DeepPartial } from 'react-hook-form';
import { ZodEffects, ZodObject, ZodRawShape, z } from 'zod';

export type StepFormSchema =
  | ZodObject<ZodRawShape>
  | ZodEffects<ZodObject<ZodRawShape>>;
export type StepFormValues<T extends StepFormSchema> = z.infer<T>;
export interface FormStep<T extends StepFormSchema> {
  getDefaultValues: () => DeepPartial<StepFormValues<T>>;
  onSubmit: (data: StepFormValues<T>) => Promise<void>;
  validationSchema: T;
  component: () => JSX.Element;
  onComplete?: (data: StepFormValues<T>) => void;
  onError?: (error: unknown) => void;
}
export interface FormStepperBuilder {
  createStep: <T extends StepFormSchema>(step: FormStep<T>) => FormStep<T>;
}
