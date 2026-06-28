import React, { useReducer } from "react";

let states = [];

let flag = 0;

export const useMyRef = <T,>(initialValue: T): { current: T } => {
  const [ref] = useReducer((s: { current: T }) => s, { current: initialValue });
  return ref;
};
