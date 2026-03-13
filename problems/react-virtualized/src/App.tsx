import { useState } from "react";
import "./App.css";
import List from "./component/list";

function App() {
  const [count, setCount] = useState(20000);

  return (
    <>
      <div id="input-container">
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
      <List length={count} />
    </>
  );
}

export default App;
