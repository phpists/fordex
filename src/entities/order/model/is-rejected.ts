import { RequestOrderStatus } from './request-order-status';

export function isOrderRejected(status: RequestOrderStatus) {
  return [
    RequestOrderStatus.CancelledByContractor,
    RequestOrderStatus.CancelledByCustomer,
  ].some((it) => it === status);
}
