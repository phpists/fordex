import { AxiosError } from 'axios';

import { useTransportationOrderStore } from './use-transportation-order-store';

import {
  AddPositionsForm,
  AddTransportationForm,
  positionsFormValidationSchema,
  transportationDetailsFormValidationSchema,
} from 'features/create-order-request';
import { paginatedOrdersQuery } from 'entities/order';
import { createFormSteps } from 'shared/modules';
import { snackbar } from 'shared/modules/snackbar';
import { queryClient } from 'shared/utils';
import { confirmCreationFormValidation } from './use-confirm-creation-form';
import { ConfirmCreationStep } from '../ui/confirm-creation-step';

export const TRANSPORTATION_ORDER_STEPS = createFormSteps((builder) => [
  builder.createStep({
    validationSchema: transportationDetailsFormValidationSchema,
    onSubmit:
      useTransportationOrderStore.getState().handleSubmitTransportationDetails,
    getDefaultValues: () =>
      useTransportationOrderStore.getState().transportationDetailsForm,
    component: AddTransportationForm,
  }),
  builder.createStep({
    validationSchema: positionsFormValidationSchema,
    onSubmit: useTransportationOrderStore.getState().handleSubmitPositions,
    getDefaultValues: () =>
      useTransportationOrderStore.getState().positionsForm,
    component: AddPositionsForm,
  }),
  builder.createStep({
    validationSchema: confirmCreationFormValidation,
    getDefaultValues: () => ({ confirmed: false }),
    onSubmit: () => useTransportationOrderStore.getState().createOrder(),
    // @ts-ignore: Unreachable code error
    component: ConfirmCreationStep,
    onComplete: () => {
      queryClient.invalidateQueries({
        queryKey: paginatedOrdersQuery.builders.staticQueryKey,
      });
      snackbar.show({
        type: 'success',
        message: 'Auftrag erfolgreich erstellt',
        autoHideDuration: 3000,
        canClose: true,
      });
    },
    onError: (error) => {
      let errorMessage = 'Bei der Erstellung ist ein Fehler aufgetreten';
      if (error instanceof AxiosError && error.response?.data.error.message) {
        errorMessage = error.response?.data.error.message;
      }
      snackbar.show({
        type: 'error',
        message: errorMessage,
        autoHideDuration: 3000,
        canClose: true,
      });
    },
  }),
]);

export const TRANSPORTATION_ORDER_STEPS_TEXTS = [
  {
    title: 'Anfrage für Transportauftrag',
    description:
      'Bitte geben Sie ein, von welchem Ort nach welchem Ort Sie den Transport wünschen',
    nextStepButtonTitle: 'Zu Auftragsdetails',
  },
  {
    title: 'Eingaben Positionen',
    description: 'Beschreiben Sie kurz Ihre Sendung.',
    nextStepButtonTitle: 'Zur Zusammenfassung',
  },
  {
    title: 'Anfrage für Transportauftrag',
    description:
      'Fast alles ist bereit! Bitte überprüfen Sie Ihre Transportanfrage. Wenn alle Daten korrekt sind, klicken Sie auf die Schaltfläche "Transport Anfrage senden"',
    nextStepButtonTitle: 'Transport Anfrage senden',
  },
];
