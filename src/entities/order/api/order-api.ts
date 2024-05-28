import { SuccessResponseDTO, withAbortSignal } from 'shared/api';
import { httpClient } from 'shared/utils';
import { CreateOrderRequestDTO } from './dto/create-order-dto';
import { CancelOrderDTO, GetDocumentDTO } from './dto/cancel-order-dto';

export const ORDER_API_ROUTES = {
  createOrder: '/api/weborder/create',
  cancelOrder: '/api/weborder/cancel',
  getDocument: '/api/documents/weborder/common',
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

export const getDocument = withAbortSignal<GetDocumentDTO>()(
  ({ data, signal }) =>
    httpClient.get(`${ORDER_API_ROUTES.getDocument}/${data.orderId}`, {
      signal,
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf',
      },
    })
);
