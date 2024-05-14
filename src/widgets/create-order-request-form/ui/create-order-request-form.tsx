import { Box, SxProps, Theme, styled } from '@mui/material';
import { forwardRef, useCallback } from 'react';

import { MultiStepForm } from 'shared/modules';
import { getSxPropsAsArray } from 'shared/utils';

import { useTransportationOrderStore } from '../model/use-transportation-order-store';
import { TRANSPORTATION_ORDER_STEPS } from '../model/transportation-order-steps';
import { FOOTER_HEIGHT } from '../lib/constants';

import { TransportationOrderFormStepper } from './transportation-order-form-stepper';
import { FormHeader } from './header';
import { FormContent } from './content';

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
  height: FOOTER_HEIGHT,
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    background: 'white',
  },
}));

interface CreateTransportationOrderFormProps {
  sx?: SxProps<Theme>;
  onCancelClick: () => void;
  onSuccess: () => void;
}

export const CreateTransportationOrderForm = forwardRef<
  HTMLFormElement,
  CreateTransportationOrderFormProps
>(function TransportationOrderForm({ sx, onCancelClick, onSuccess }, ref) {
  const resetFormStore = useTransportationOrderStore((store) => store.reset);

  const handleSubmitSuccess = useCallback(() => {
    resetFormStore();
    onSuccess();
  }, [onSuccess, resetFormStore]);

  return (
    <MultiStepForm
      onFullComplete={handleSubmitSuccess}
      formSteps={TRANSPORTATION_ORDER_STEPS}
    >
      <MultiStepForm.FormHandler
        ref={ref}
        sx={[
          (theme) => ({
            background: 'white',
            width: '100%',
            height: '100%',
            borderRadius: 3,
            position: 'relative',
            [theme.breakpoints.down('md')]: {
              overflow: 'auto',
              paddingBottom: `${FOOTER_HEIGHT}px`,
              display: 'flex',
              flexDirection: 'column',
            },
          }),
          ...getSxPropsAsArray(sx),
        ]}
      >
        <FormHeader />
        <FormContent />
        <Footer>
          <TransportationOrderFormStepper onCancelClick={onCancelClick} />
        </Footer>
      </MultiStepForm.FormHandler>
    </MultiStepForm>
  );
});
