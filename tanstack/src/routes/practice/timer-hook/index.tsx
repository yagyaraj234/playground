import React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/practice/timer-hook/")({
  component: RouteComponent,
});

// const TOTAL_TIME = 5;
// const { isRunning, start, stop, seconds } = useTimer(TOTAL_TIME);

export const useTimer = (TOTAL_TIME: number) => {
  const [timer, setTimer] = React.useState(TOTAL_TIME * 60);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimer((timer: number) => {
        if (timer > 0) {
          return timer - 1;
        }
        return timer;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
  }
  function stop() {
    setIsRunning(false);
  }

  return {
    isRunning: isRunning,
    start,
    stop,
    seconds: timer,
  };
};

function RouteComponent() {
  const { isRunning, start, stop, seconds } = useTimer(1);
  return (
    <main className="h-dvh w-dvw flex items-center justify-center">
      <div
        className={`${isRunning ? "bg-green-300" : "bg-amber-100"} p-4 rounded-2xl`}
      >
        <h1>{seconds} Seconds left</h1>

        <div className="flex gap-4 items-center">
          <button onClick={start}>start</button>
          <button onClick={stop}>stop</button>
        </div>
      </div>
    </main>
  );
}
