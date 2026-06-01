import React from "react";
export default function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback);

  // Keep latest callback
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) return;
    const item = setTimeout(() => {
      savedCallback.current();
    }, delay ?? 0);

    return () => {
      clearTimeout(item);
    };
  }, [delay]);
}
