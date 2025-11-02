import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function Increment() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <div
        className="mb-4"
        style={{
          marginBottom: 16,
          fontSize: "24px",
          fontWeight: 500,
        }}
      >
        {count}
      </div>

      <button onClick={Increment}>Increment</button>
    </>
  );
}
