import { ActiveOrderStatusText } from '../model/active-order-status';
import {
  RequestOrderStatus,
  RequestOrderStatusText,
} from '../model/request-order-status';

interface GetOrderStatusColor {
  (type: 'request', status: RequestOrderStatus): string;
  (type: 'active', status: string): string;
  (type: 'active' | 'request', status: string | RequestOrderStatus): string;
}

export const getOrderStatusText: GetOrderStatusColor = (type, status) => {
  if (type === 'active') {
    return ActiveOrderStatusText[status as string] ?? status;
  }

  return RequestOrderStatusText[status as RequestOrderStatus];
};
