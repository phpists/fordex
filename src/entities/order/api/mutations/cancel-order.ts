import { createMutationHook, queryClient } from 'shared/utils';

import { paginatedOrdersQuery } from '../queries';
import { cancelOrder } from '../order-api';

export const useCancelOrderMutation = createMutationHook(cancelOrder, {
  onSuccess: () =>
    queryClient.invalidateQueries({
      queryKey: paginatedOrdersQuery.builders.staticQueryKey,
    }),
});
