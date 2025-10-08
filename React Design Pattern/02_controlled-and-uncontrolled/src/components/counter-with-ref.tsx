import { useRef, useState } from "react";

export default function CounterWithRef() {
  const ref = useRef(0); //persist between render

  const [renderCount, setRenderCount] = useState(0);

  function Increment() {
    ref.current = ref.current + 1;
    setRenderCount((count) => count + 1);
  }

  return (
    <div>
      <div>{ref.current || "empty value"}</div>

      <button onClick={Increment}>Click me</button>
      {/* <div>{renderCount}</div>

      <button onClick={() => setRenderCount((count) => count + 1)}>
        Click me
      </button> */}
    </div>
  );
}
