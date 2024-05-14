import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import {
  PositionsFormValues,
  TransportationDetailsFormValues,
} from 'features/create-order-request';
import { createOrder } from 'entities/order';
import { getDisplayAddressText } from '../lib/get-display-address-text';

interface FormData {
  deliveryDetails: TransportationDetailsFormValues;
  products: PositionsFormValues;
}

const formatTime = (iso: string | null) => {
  return iso ? dayjs(iso).format('hh:mm') : null;
};

export async function createOrderFromFormData({
  deliveryDetails,
  products,
}: FormData): Promise<AxiosResponse> {
  return createOrder({
    data: {
      deliveryData: {
        dateDispatch: deliveryDetails.addressFrom.date,
        timeDispatch: formatTime(deliveryDetails.addressFrom.timeFrom),
        timeUntilDispatch: formatTime(deliveryDetails.addressFrom.timeTo),
        dispatcherName: deliveryDetails.addressFrom.userName,
        dispatcherCountry: deliveryDetails.addressFrom.country.label,
        dispatcherPhone: deliveryDetails.addressFrom.phoneNumber,
        dispatcherZipCity: getDisplayAddressText(
          deliveryDetails.addressFrom.city
        ),
        dispatcherStreet: deliveryDetails.addressFrom.street,
        dateReceipt: deliveryDetails.addressTo.date,
        timeReceipt: formatTime(deliveryDetails.addressTo.timeFrom),
        timeUntilReceipt: formatTime(deliveryDetails.addressTo.timeTo),
        receiptName: deliveryDetails.addressTo.userName,
        receiptCountry: deliveryDetails.addressTo.country.label,
        receiptPhone: deliveryDetails.addressTo.phoneNumber,
        receiptZipCity: getDisplayAddressText(deliveryDetails.addressTo.city),
        receiptStreet: deliveryDetails.addressTo.street,
        detailsMessage: deliveryDetails.details,
        reference: deliveryDetails.customerReference,
      },
      products: products.positions.map((it) => ({
        effectiveWeight: it.weight,
        productCount: it.boxesQty,
        ldm: it.ldm || 0,
        volume: it.volume || 0,
        square: it.area || 0,
        productName: it.marking,
        description: it.description,
        productType: it.pack,
        un: it.dangerousGoods,
      })),
    },
  });
}
