import { RequestOrderStatus } from '../model/request-order-status';

export const ActiveOrderStatusChipColor: Record<string, string> = {
  Dispositionsbereit: '#FFFF00',
  'Dispo abgelaufen': '#FF5252',
  Disponiern: '#FFA500',
  'Lieferung Lauft': '#9370DB',
  'Lfg. abgelaufen': '#8B0000',
  Abgeholt: '#298FD9',
  Geliefert: '#2FCF72',
  Fakturierung: '#800080',
  'Rechnung Erschtellt': '#FFC0CB',
};

export const RequestOrderStatusChipColor = {
  [RequestOrderStatus.AddedViaWeb]: '#FFA500',
  [RequestOrderStatus.OpenedViaWeb]: '#FF0000',
  [RequestOrderStatus.Confirmed]: '#008000',
  [RequestOrderStatus.CancelledByContractor]: '#808080',
  [RequestOrderStatus.CancelledByCustomer]: '#808080',
};

interface GetOrderStatusColor {
  (type: 'request', status: RequestOrderStatus): string;
  (type: 'active', status: string): string;
  (type: 'active' | 'request', status: string | RequestOrderStatus): string;
}

export const getOrderStatusColor: GetOrderStatusColor = (
  type: 'request' | 'active',
  status: RequestOrderStatus | string
) => {
  if (type === 'active') {
    return ActiveOrderStatusChipColor[status];
  }

  return RequestOrderStatusChipColor[status as RequestOrderStatus];
};
