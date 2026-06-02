import React from "react";

export const useThrottle = (callback: Function, delay: number) => {
  const lastCallRef = React.useRef(null);

  return (...args: any[]) => {
    const now = Date.now();

    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback(...args);
    }
  };
};
