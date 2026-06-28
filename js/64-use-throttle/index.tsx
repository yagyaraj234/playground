import React from "react";

export const useThrottle = (
  fn: () => void,
  duration = 10000,
  option = { leading: false, trailing: false },
) => {
  const lastCalledAt = React.useRef<number>(-Infinity);
  const fnRef = React.useRef(fn);
  fnRef.current = fn;

  return React.useCallback(
    (...args: any[]) => {
      const now = performance.now();
      if (now - lastCalledAt.current >= duration) {
        lastCalledAt.current = now;
        fnRef.current(...args);
      }
    },
    [duration],
  );
};
