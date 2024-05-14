import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

import {
  BillingAddressFormValues,
  DEFAULT_ADD_POSITIONS_FORM_VALUES,
  DEFAULT_BILLING_ADDRESS_FORM_VALUES,
  DEFAULT_TRANSPORTATION_DETAILS_FORM_VALUES,
  PositionsFormValues,
  TransportationDetailsFormValues,
} from 'features/create-order-request';
import { createOrderFromFormData } from '../api/create-order-from-form-values';

interface TransportationOrderStore {
  billingAddressForm: BillingAddressFormValues;
  transportationDetailsForm: TransportationDetailsFormValues;
  positionsForm: PositionsFormValues;
  handleSubmitTransportationDetails: (
    data: TransportationDetailsFormValues
  ) => Promise<void>;
  handleSubmitPositions: (data: PositionsFormValues) => Promise<void>;
  handleSubmitBillingAddress: (data: BillingAddressFormValues) => Promise<void>;
  createOrder: () => Promise<void>;
  reset: () => void;
}

const INITIAL_TRANSPORTATION_ORDER_FORM_VALUES = {
  billingAddressForm: DEFAULT_BILLING_ADDRESS_FORM_VALUES,
  transportationDetailsForm: DEFAULT_TRANSPORTATION_DETAILS_FORM_VALUES,
  positionsForm: DEFAULT_ADD_POSITIONS_FORM_VALUES,
};

const STORE_NAME = 'transportation-order';

export const useTransportationOrderStore = create<TransportationOrderStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_TRANSPORTATION_ORDER_FORM_VALUES,
        handleSubmitTransportationDetails: async (data) =>
          set(
            { transportationDetailsForm: data },
            false,
            'transportation-order/submit-transportation-details'
          ),
        handleSubmitPositions: async (data) =>
          set(
            { positionsForm: data },
            false,
            'transportation-order/submit-positions'
          ),
        handleSubmitBillingAddress: async (data) =>
          set(
            { billingAddressForm: data },
            false,
            'transportation-order/submit-billing-address'
          ),
        createOrder: async () => {
          const { transportationDetailsForm, positionsForm } = get();
          await createOrderFromFormData({
            deliveryDetails: transportationDetailsForm,
            products: positionsForm,
          });
        },
        reset: () => set(INITIAL_TRANSPORTATION_ORDER_FORM_VALUES),
      }),
      {
        name: STORE_NAME,
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: STORE_NAME,
      anonymousActionType: `${STORE_NAME}/anonymous-action`,
    }
  )
);
