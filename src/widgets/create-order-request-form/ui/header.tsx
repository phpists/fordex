import { Stack, Typography, styled } from '@mui/material';
import { useStore } from 'zustand';

import { useStepperStoreContext } from 'shared/modules/stepper-form/store';

import { FormContentProps } from '../model/types';
import {
  HEADER_HEIGHT_WITHOUT_DESCRIPTION,
  HEADER_HEIGHT_WITH_DESCRIPTION,
} from '../lib/constants';
import { TRANSPORTATION_ORDER_STEPS_TEXTS } from '../model/transportation-order-steps';
import { Stepper } from './stepper';

const Header = styled(Stack)<FormContentProps>(
  ({ theme, withDescription }) => ({
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    height: withDescription
      ? HEADER_HEIGHT_WITH_DESCRIPTION
      : HEADER_HEIGHT_WITHOUT_DESCRIPTION,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      textAlign: 'start',
      position: 'static',
      paddingTop: theme.spacing(1),
    },
  })
);

export function FormHeader() {
  const stepperStore = useStepperStoreContext();
  const activeStep = useStore(stepperStore, (state) => state.step);
  const textContent = TRANSPORTATION_ORDER_STEPS_TEXTS[activeStep];

  return (
    <Header textAlign="center" withDescription={!!textContent.description}>
      <Typography variant="h5" fontWeight="bold">
        {textContent.title}
      </Typography>
      <Stepper activeStep={activeStep} />
      <Typography variant="body2" color="secondary.light">
        {textContent.description}
      </Typography>
    </Header>
  );
}
