import React from "react";

export const useResponsive = () => {
  const [current, setCurrent] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  const updateDevice = React.useCallback((width: number) => {
    switch (true) {
      case width > 990:
        setCurrent({ isMobile: false, isTablet: false, isDesktop: true });
        break;

      case width >= 768:
        setCurrent({ isMobile: false, isTablet: true, isDesktop: false });
        break;

      default:
        setCurrent({ isMobile: true, isTablet: false, isDesktop: false });
    }
  }, []);

  React.useLayoutEffect(() => {
    // onRender check
    updateDevice(window.innerWidth);

    function onWidthChange() {
      updateDevice(window.innerWidth);
    }

    window.addEventListener("resize", onWidthChange, false);

    return () => {
      window.removeEventListener("resize", onWidthChange);
    };
  }, [updateDevice]);

  return current;
};
