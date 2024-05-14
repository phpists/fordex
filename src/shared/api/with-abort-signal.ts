interface CreateRequestWithAbortSignalProps<T> {
  data: T;
  signal?: AbortSignal;
}

type RequestFn<T, K> = (
  props: CreateRequestWithAbortSignalProps<T>
) => Promise<K>;

/**
 * Helper for making conventional request function
 * in one code style, which accepts abort signal
 * in addition to request data
 *
 * @param requestFn Request function
 */
export function withAbortSignal<T>() {
  return <K>(requestFn: RequestFn<T, K>) => requestFn;
}
