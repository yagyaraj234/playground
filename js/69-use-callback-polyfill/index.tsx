import React from "react";

type Deps = unknown[];

function checkDepsChanged(prev: Deps, current: Deps) {
  if (prev === null) return true;
  if (prev.length !== current.length) return true;

  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], current[i])) return true;
  }
  return false;
}

export const useCallbackPolyfill = (
  callback: (...args: unknown[]) => any,
  deps: Deps,
) => {
  const lastDepsRef = React.useRef(null);
  const lastFnRef = React.useRef<Function | null>(null);

  if (lastFnRef.current && !checkDepsChanged(lastDepsRef.current, deps)) {
    return lastFnRef.current;
  }

  lastDepsRef.current = deps;
  lastFnRef.current = function (...args: any[]) {
    return callback(...args);
  };

  return lastFnRef.current;
};
