import React, { useReducer } from "react";

let flag = 0;
let states = [];

export const useMyState = <T,>(
  value: T,
): [T, (newValue: T | ((prev: T) => T)) => void] => {
  let curr = flag++;

  const [_, renderer] = useReducer(() => ({}), {});

  if (states[curr]) {
    return states[curr];
  }

  function forceRender() {
    flag = 0;
    renderer({});
  }

  function update(newValue: T) {
    let old = states[curr][0];
    let value = typeof newValue === "function" ? newValue(old) : newValue;
    debugger;

    if (Object.is(old, value)) {
      return;
    }
    states[curr][0] = value;
    forceRender();
  }

  let res = [value, update];

  states[curr] = res;
  return res;
};
