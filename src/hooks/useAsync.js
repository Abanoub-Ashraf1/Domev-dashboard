import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const callId = useRef(0);

  const run = useCallback(() => {
    const id = ++callId.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    asyncFn()
      .then((data) => {
        if (id === callId.current) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (id === callId.current) setState((prev) => ({ ...prev, loading: false, error }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
    return () => {
      callId.current++;
    };
  }, [run]);

  const setData = useCallback((updater) => {
    setState((prev) => ({
      ...prev,
      data: typeof updater === "function" ? updater(prev.data) : updater,
    }));
  }, []);

  return { ...state, reload: run, setData };
}
