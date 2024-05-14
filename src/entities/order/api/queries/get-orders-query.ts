import { configurePaginatedDataQuery } from 'shared/modules/paginated-data-manager';
import { BasePaginationParams, PaginatedData, ResponseDTO } from 'shared/api';
import { httpClient } from 'shared/utils';

import { RequestOrderModel } from '../../model/model.types';
import { RequestOrderDTO } from '../dto/order-dto';
import { mapToOrderRequestModel } from '../mappers';

export const getPaginatedOrders = async (
  params: BasePaginationParams
): Promise<PaginatedData<RequestOrderModel>> => {
  const response = await httpClient.get<
    ResponseDTO<PaginatedData<RequestOrderDTO>>
  >('/api/weborder/client/web-orders', {
    params,
  });

  if (!response.data.succeeded) {
    throw new Error(response.data.error.message);
  }

  const mappedItems = response.data.data.items.map(mapToOrderRequestModel);

  return {
    ...response.data.data,
    items: mappedItems,
  };
};

export const paginatedOrdersQuery = configurePaginatedDataQuery<
  BasePaginationParams,
  RequestOrderModel
>({
  scopeName: ['orders', 'in-review'],
  queryFn: getPaginatedOrders,
  initialFilterValues: {},
});
