import { RequestOrderStatus } from './request-order-status';

export interface DeliveryDetailsModel {
  date: Date;
  timeFrom: string | null;
  timeTo: string | null;
  zipCity: string;
}

export interface RequestDeliveryInfo {
  dispatchData: DeliveryDetailsModel;
  receiptData: DeliveryDetailsModel;
  reference: string;
  detailsMessage: string;
}
export interface RequestOrderModel {
  id: number;
  creationDate: Date;
  statusChangedDate: Date;
  status: RequestOrderStatus;
  orderNumber: string;
  effectiveWeight: number;
  deliveryInfo: RequestDeliveryInfo;
  mobileRowsList?: string[];
}

export interface OrderModel {
  id: number;
  orderId: number;
  zipCityDispatch: string;
  zipCityReceipt: string;
  dateTimeDispatch: string;
  dateTimeReceipt: string;
  weight: number;
  countEup: number;
  orderStatus: string;
}
