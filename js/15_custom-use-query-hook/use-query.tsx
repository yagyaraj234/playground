import React from "react";
/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {import("react").DependencyList} deps
 */
export default function useQuery(fn, deps = []) {
  const [state, setState] = React.useState({
    status: "loading",
  });

  const fetchFn = React.useCallback(async () => {
    setState({
      status: "loading",
    });
    try {
      const result = await fn();
      setState({
        status: "success",
        data: result,
      });
    } catch (err) {
      setState({
        status: "error",
        error: err,
      });
    }
  }, [fn, ...deps]);

  React.useEffect(() => {
    fetchFn();
  }, [fetchFn]);

  return state;
}
