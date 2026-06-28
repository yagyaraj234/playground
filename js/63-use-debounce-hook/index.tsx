import React from "react";

export const useDebounce = (fn: any, delay: number, mount = false) => {
  const timerIdRef = React.useRef(null);

  const debounce = React.useCallback(
    function () {
      let context = this,
        args = arguments;

      const callNow = !timerIdRef.current && mount;

      if (callNow) {
        fn.apply(context, args);
        return;
      }
      clearTimeout(timerIdRef.current);

      timerIdRef.current = setTimeout(() => {
        fn.apply(context, args);
        timerIdRef.current = null;
      }, delay);
    },
    [fn, delay, mount],
  );

  return debounce;
};
