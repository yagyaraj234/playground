import { useState } from "react";

type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

export default function useBoolean(initialValue?: boolean): UseBooleanReturn {
  const [state, setState] = useState(initialValue ?? false);

  function setFalse() {
    setState(false);
  }
  function setTrue() {
    setState(true);
  }

  return {
    value: state,
    setFalse,
    setTrue,
  };
}
