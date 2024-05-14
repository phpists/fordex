import { RequestOrderStatus } from './request-order-status';

export function isOrderConfirmed(status: RequestOrderStatus) {
  return status === RequestOrderStatus.Confirmed;
}
