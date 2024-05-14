import { SuccessResponseDTO, withAbortSignal } from 'shared/api';
import { httpClient } from 'shared/utils';
import { CreateOrderRequestDTO } from './dto/create-order-dto';
import { CancelOrderDTO } from './dto/cancel-order-dto';

export const ORDER_API_ROUTES = {
  createOrder: '/api/weborder/create',
  cancelOrder: '/api/weborder/cancel',
};

export const createOrder = withAbortSignal<CreateOrderRequestDTO>()(
  ({ data, signal }) =>
    httpClient.post<SuccessResponseDTO>(
      ORDER_API_ROUTES.createOrder,
      { data },
      {
        signal,
      }
    )
);

export const cancelOrder = withAbortSignal<CancelOrderDTO>()(
  ({ data, signal }) =>
    httpClient.post(ORDER_API_ROUTES.cancelOrder, data, { signal })
);
