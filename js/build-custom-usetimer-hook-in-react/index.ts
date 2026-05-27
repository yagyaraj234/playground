import React from "react";

// const TOTAL_TIME = 5;
// const { isRunning, start, stop, seconds } = useTimer(TOTAL_TIME);

export const useTimer = (TOTAL_TIME: number) => {
  const [timer, setTimer] = React.useState(TOTAL_TIME * 60);
  const runningRef = React.useRef(false);
  React.useEffect(() => {
    const id = setInterval(() => {
      setTimer((timer: number) => {
        if (timer > 1 && runningRef.current) {
          return timer - 1;
        }
        return 0;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  function start() {
    runningRef.current = true;
  }
  function stop() {
    runningRef.current = false;
  }

  return {
    isRunning: runningRef.current,
    start,
    stop,
    seconds: timer,
  };
};
