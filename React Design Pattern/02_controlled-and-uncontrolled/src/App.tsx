import "./App.css";
import Counter from "./components/counter";
import AutoFocusInput from "./components/auto-focus";
import CounterWithRef from "./components/counter-with-ref";
import FormWithRefState from "./components/form-with-ref-state";

function App() {
  return (
    <>
      {/* <Counter />
      <AutoFocusInput /> */}
      <CounterWithRef />
      <FormWithRefState />
    </>
  );
}

export default App;
