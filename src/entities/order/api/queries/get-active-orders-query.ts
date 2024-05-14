import { configurePaginatedDataQuery } from 'shared/modules/paginated-data-manager';
import { BasePaginationParams, PaginatedData, ResponseDTO } from 'shared/api';
import { httpClient } from 'shared/utils';

import { OrderModel } from '../../model/model.types';
import { RequestOrderDTO } from '../dto/order-dto';

export const getPaginatedActiveOrders = async (
  params: BasePaginationParams
): Promise<PaginatedData<OrderModel>> => {
  const response = await httpClient.get<
    ResponseDTO<PaginatedData<RequestOrderDTO>>
  >('/api/weborder/client/common-orders', {
    params,
  });

  if (!response.data.succeeded) {
    throw new Error(response.data.error.message);
  }

  // @ts-expect-error: Unreachable code error
  return response.data?.data;
};

export const paginatedActiveOrdersQuery = configurePaginatedDataQuery<
  BasePaginationParams,
  OrderModel
>({
  scopeName: ['orders'],
  queryFn: getPaginatedActiveOrders,
  initialFilterValues: {},
});
