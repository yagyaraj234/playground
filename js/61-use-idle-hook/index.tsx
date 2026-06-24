import React from "react";

const EVENTS = [
  "pointerdown",
  "pointermove",
  "keydown",
  "scroll",
  "visibilitychange",
] as const;

export const useIdle = (delay: number) => {
  const [idle, setIdle] = React.useState(false);
  const timeoutId = React.useRef();

  function startTimer() {
    timeoutId.current = setTimeout(() => {
      setIdle(true);
    }, delay);
  }

  function resetTimer() {
    timeoutId.current && clearTimeout(timeoutId.current);
    setIdle(false);
    startTimer();
  }

  React.useEffect(() => {
    startTimer();

    document.addEventListener("pointerdown", resetTimer);
    document.addEventListener("pointermove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("scroll", resetTimer);

    //  tab aware
    // When the user is switching, tap that time to start the timer but it is not specifically required. Blur handles this

    // document.addEventListener('visibilitychange',()=>{
    //     if (document.visibilityState === 'hidden') {
    //         startTimer()  // user switched tab → start idle
    //     } else {
    //         resetTimer()  // user came back → reset
    //     }
    // })

    window.addEventListener("blur", startTimer);
    window.addEventListener("focus", resetTimer);

    return () => {
      document.removeEventListener("poiinterdown", resetTimer);
      document.removeEventListener("pointermove", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("scroll", resetTimer);

      window.removeEventListener("blur", startTimer);
      window.removeEventListener("focus", resetTimer);
    };
  }, []);

  return idle;
};
