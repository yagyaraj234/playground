import React from "react";

export const useAsync = (fetch: Function, mount = false, ...input: any[]) => {
  const [state, setState] = React.useState({
    status: "idle",
    value: null,
    error: null,
  });

  const refetch = React.useCallback(async () => {
    setState((p) => ({ ...p, status: "loading" }));

    try {
      const res = await fetch(...input);

      setState((p) => ({ ...p, status: "success", value: res }));
    } catch (error) {
      setState((p) => ({ ...p, status: "error", error }));
    }
  }, [fetch]);

  React.useEffect(() => {
    if (mount) {
      refetch();
    }
  }, [mount, refetch]);

  return {
    ...state,
    refetch,
  };
};
