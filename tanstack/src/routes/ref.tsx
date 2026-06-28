import { createFileRoute } from "@tanstack/react-router";
import { useMyRef } from "../hooks/use-my-ref";
import { useMyState } from "../hooks/use-my-state";

export const Route = createFileRoute("/ref")({
  component: RouteComponent,
});

function RouteComponent() {
  const [state, update] = useMyState(0);
  const ref = useMyRef(null);

  function increment() {
    update((c) => c + 1);
  }

  function decrement() {
    update((c) => c - 1);
    ref.current =5;
  }

  console.log("state ", state, ref);
  return (
    <div className="flex justify-center items-center h-dvh w-dvh ">
      <div ref={ref} className="flex gap-4 items-center text-4xl text-white">
        <button onClick={decrement}>-</button>
        <div>{state}</div>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}
