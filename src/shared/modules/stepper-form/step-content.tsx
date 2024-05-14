import { useStepperStore } from './store';

import { useToggle } from 'react-use';
import { useLayoutEffect } from 'react';

export function MultiStepFormStepContent() {
  const [formIsMounted, toggle] = useToggle(true);

  const Component = useStepperStore(
    ({ step, formSteps }) => formSteps[step].component
  );
  const validationSchema = useStepperStore(
    ({ step, formSteps }) => formSteps[step].validationSchema
  );

  useLayoutEffect(() => {
    toggle(false);
    const timerId = setTimeout(() => {
      toggle(true);
    }, 5);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationSchema]);

  if (!formIsMounted) {
    return <></>;
  }

  return <Component />;
}
