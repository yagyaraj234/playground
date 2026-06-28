import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

type Deps = unknown[];

function checkDepsChanged(prev: Deps, current: Deps) {
  if (prev.length !== current.length) return true;

  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], current[i])) return true;
  }
  return false;
}

export const useEffectPolyfill = (callback: () => void, deps?: Deps) => {
  const isMounted = React.useRef(null);
  const lastDepRef = React.useRef(null);
  const cleanupRef = React.useRef(null);

  function exec() {
    cleanupRef.current && cleanupRef.current();
    cleanupRef.current = callback();
    lastDepRef.current = deps;
  }

  if (!isMounted.current) {
    exec();
    isMounted.current = true;
  } else if (!deps) {
    exec();
  } else if (checkDepsChanged(lastDepRef.current, deps)) {
    exec();
  }
};

let state: any = [];
let flag = 0;

export const useStatePolyfill = (value: any) => {
  const currId = flag++;

  const [_, renderer] = React.useReducer(() => ({}), {});

  if (state[currId]) {
    return state[currId];
  }

  function forceUpdate() {
    flag = 0;
    renderer({});
  }

  function update<T>(newValue: (value: T) => T | string | number) {
    let currVal = state[currId][0];
    let newVal = typeof newValue === "function" ? newValue(currVal) : newValue;

    if (Object.is(currVal, newVal)) return;
    state[currId][0] = newVal;

    forceUpdate();
  }

  let res = [value, update];
  state[currId] = res;

  return res;
};

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  const [count, setCount] = useStatePolyfill(1);
  const [count2, setCount2] = useStatePolyfill(2);
  console.log("count: ", count, count2);

  return (
    <div className="p-2 flex gap-4 bg-white h-screen w-screen flex-col items-center justify-center ">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-4 items-center">
          <button className="text-3xl" onClick={() => setCount((c) => c - 1)}>
            -
          </button>
          <div className="text-xl">{count}</div>
          <button onClick={() => setCount(count + 1)} className="text-3xl">
            +
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <button className="text-3xl" onClick={() => setCount2((c) => c - 1)}>
            -
          </button>
          <div className="text-xl">{count2}</div>
          <button onClick={() => setCount2((c) => c + 1)} className="text-3xl">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
