import React from "react";

type Deps = unknown[];

function checkDepsChanged(prev: Deps, current: Deps) {
  if (prev.length !== current.length) return true;

  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], current[i])) return true;
  }
  return false;
}

export const useEffectPolyfill = (callback: () => void, deps?: Deps) => {
  const isMounted = React.useRef(null);
  const lastDepRef = React.useRef(null);
  const cleanupRef = React.useRef(null);

  function exec() {
    cleanupRef.current && cleanupRef.current();
    cleanupRef.current = callback();
    lastDepRef.current = deps;
  }

  if (!isMounted.current) {
    exec();
    isMounted.current = true;
  } else if (!deps) {
    exec();
  } else if (checkDepsChanged(lastDepRef.current, deps)) {
    exec();
  }
};
