import { RequestOrderStatus } from 'entities/order';

export interface DeliveryDataDTO {
  dateDispatch: string;
  timeDispatch: string | null;
  timeUntilDispatch: string | null;
  dispatcherZipCity: string;
  dateReceipt: string;
  timeReceipt: string | null;
  timeUntilReceipt: string | null;
  receiptZipCity: string;
  reference: string;
  detailsMessage: string;
}

export interface RequestOrderDTO {
  id: number;
  creationDate: string;
  statusChangedDate: string;
  webOrderNumber: string;
  webOrderStatus: RequestOrderStatus;
  effectiveWeight: number;
  deliveryData: DeliveryDataDTO;
}
