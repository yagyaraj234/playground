import { useRef } from "react";

export default function AutoFocusInput() {
  const ref = useRef(null);

  function handleFocus() {
    if (ref.current) {
      ref.current.focus(); // direct access to dom
    }
  }

  return (
    <div>
      <label
        onClick={handleFocus}
        htmlFor=""
        style={{ fontWeight: 500, fontSize: 24, marginBottom: 24 }}
      >
        Name
      </label>
      <input ref={ref} type="text" placeholder="Type Here" />
    </div>
  );
}
