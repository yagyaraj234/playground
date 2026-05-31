import React, { Dispatch, useState, SetStateAction } from "react";

interface UseArrayReturn<T> {
  array: T[];
  set: Dispatch<SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export default function useArray<T>(defaultValue: T[]): UseArrayReturn<T> {
  const [arr, setArr] = useState(defaultValue);

  const push = React.useCallback((element: T) => {
    setArr((prev) => [...prev, element]);
  }, []);

  const filter = React.useCallback((callback) => {
    const res = [];
    arr.forEach((it) => {
      if (callback(it)) {
        res.push(it);
      }
    });
    setArr(res);
  }, []);

  const remove = React.useCallback((idx) => {
    setArr((prev) => {
      return prev.filter((_, index) => index !== idx);
    });
  }, []);

  const update = React.useCallback((idx, newItem) => {
    setArr((prev) => {
      return prev.map((it, index) => {
        if (index === idx) return newItem;
        return it;
      });
    });
  }, []);
  const clear = React.useCallback(() => {
    setArr([]);
  }, []);

  return {
    array: arr,
    set: setArr,
    push,
    filter,
    remove,
    update,
    clear,
  };
}
