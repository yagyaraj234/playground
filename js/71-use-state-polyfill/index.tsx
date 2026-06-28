import React from "react";

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
