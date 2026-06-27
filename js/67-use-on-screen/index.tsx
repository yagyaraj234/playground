import React from "react";

export const useOnScreen = (ref: React.Ref) => {
  const [isIntersecting, setIntersecting] = React.useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      // update the state on interaction change
      setIntersecting(entry.isIntersecting);
    },
    {
      threshold: 1.0,
    },
  );

  React.useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export const useOnScreen2 = (ref: React.Ref) => {
  const [isIntersecting, setIntersecting] = React.useState(false);

  // determine if the element is visible
  const observer = function () {
    const offset = 50;
    const top = ref.current.getBoundingClientRect().top;
    setIntersecting(top + offset >= 0 && top - offset <= window.innerHeight);
  };

  React.useEffect(() => {
    observer();

    window.addEventListener("scroll", observer);
    window.addEventListener("resize", observer);

    return () => {
      window.removeEventListener("scroll", observer);
      window.removeEventListener("resize", observer);
    };
  }, []);

  return isIntersecting;
};
