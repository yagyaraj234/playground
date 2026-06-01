import React from "react";
interface WindowSize {
  height: number;
  width: number;
}

export default function useWindowSize(): WindowSize {
  const [screenSize, setScreenSize] = React.useState<WindowSize>({
    height: window.innerHeight || 0,
    width: window.innerWidth || 0,
  });

  React.useEffect(() => {
    const handleWindowSize = (e) => {
      setScreenSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  return screenSize;
}
