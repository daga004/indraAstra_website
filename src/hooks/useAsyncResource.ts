import { useEffect, useState } from 'react';

export interface AsyncResource<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

export function useAsyncResource<T>(loader: () => Promise<T>, dependencies: unknown[] = []): AsyncResource<T> {
  const [state, setState] = useState<AsyncResource<T>>({ data: null, loading: true, error: false });

  useEffect(() => {
    let mounted = true;
    setState({ data: null, loading: true, error: false });

    loader()
      .then((data) => mounted && setState({ data, loading: false, error: false }))
      .catch(() => mounted && setState({ data: null, loading: false, error: true }));

    return () => {
      mounted = false;
    };
    // Loaders are module functions; callers provide explicit dependencies when the request changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
