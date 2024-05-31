import React, {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useEvent, useToggle } from 'react-use';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';

import { RequestOrderModel, useCancelOrderMutation } from 'entities/order';
import { snackbar } from 'shared/modules/snackbar';

import {
  CancelOrderFormValues,
  useCancelOrderForm,
} from '../model/use-cancel-order-form';
import { AxiosError } from 'axios';

interface CancelOrderConfirmationProps {
  orderId: RequestOrderModel['id'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<JSXElementConstructor<any>>;
}

export function CancelOrderConfirmation({
  children,
  orderId,
}: CancelOrderConfirmationProps) {
  const [open, toggle] = useToggle(false);
  const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useCancelOrderForm();
  const { mutateAsync } = useCancelOrderMutation();
  const element = React.Children.only(children);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEvent('click', toggle, buttonElement);

  const onSubmit = useCallback(
    async (formData: CancelOrderFormValues) => {
      try {
        await mutateAsync({
          data: {
            rejectedMessage: formData.reasonMessage,
            webOrderId: orderId,
          },
        });
        snackbar.show({
          type: 'success',
          message: 'Antrag storniert',
          autoHideDuration: 3000,
        });
        reset();
        toggle(false);
      } catch (e) {
        if (e instanceof AxiosError && e.response?.data.error.message) {
          snackbar.show({
            type: 'error',
            message: e.response.data.error.message,
            autoHideDuration: 3000,
          });
        }
      }
    },
    [mutateAsync, orderId, reset, toggle]
  );

  return (
    <>
      {React.cloneElement(element, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ref: setButtonElement,
      })}
      <Dialog
        fullScreen={isMobile}
        disableEscapeKeyDown={isSubmitting}
        open={open}
        onClose={() => {
          reset();
          toggle(false);
        }}
        PaperProps={useMemo(
          () => ({
            sx: { maxWidth: { xs: 'unset', md: '500px' }, width: '100%' },
            component: 'form',
            onSubmit: handleSubmit(onSubmit),
          }),
          [handleSubmit, onSubmit]
        )}
      >
        <DialogTitle>
          Мöchten Sie Ihren Transportanfrage wirklich stornieren?
        </DialogTitle>
        <DialogContent>
          <Box mb={1} />
          <TextField
            fullWidth
            label="Bitte geben Sie den Grund für die Stornierung an."
            multiline
            rows={6}
            {...register('reasonMessage')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset();
              toggle(false);
            }}
            color="error"
            disabled={!open || isSubmitting}
            type="button"
          >
            Abbrechen
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Transportanfrage stornieren
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
