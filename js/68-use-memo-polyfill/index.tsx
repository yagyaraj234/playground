import React from "react";

type Deps = unknown[];

function checkDepsChanged(prev: Deps, current: Deps) {
  if (prev.length !== current.length) return true;

  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], current[i])) return true;
  }
  return false;
}

export const useMemoPolyfill = (callback: () => unknown, deps: Deps) => {
  const prevDepsValueRef = React.useRef(deps);
  const lastValue = React.useRef(null);

  if (!lastValue.current || checkDepsChanged(prevDepsValueRef.current, deps)) {
    prevDepsValueRef.current = deps;
    lastValue.current = callback();
  }

  React.useEffect(() => {
    return () => {
      prevDepsValueRef.current = null;
      lastValue.current = null;
    };
  }, []);

  return lastValue.current;
};
