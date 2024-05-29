export interface ActiveOrderModel {
  id: string;
  orderId: string;
  dispensationDate: string;
  truckId: string;
  zipCityDispatch: string;
  zipCityReceipt: string;
  dateTimeDispatch: string;
  dateTimeReceipt: string;
  weight: number;
  countEup: number;
  orderStatus: string;
  isMobile?: boolean;
  mobileRowsList?: string[];
  columnNumber?: number;
  orderNumber?: string;
}
