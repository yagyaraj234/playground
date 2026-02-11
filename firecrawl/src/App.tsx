import "./App.css";
import Alert from "./components/alert";
import Header from "./components/header";
import Hero from "./components/hero-section";

function App() {
  return (
    <div className="font-normal max-w-7xl sm:min-w-5xl max-sm:w-screen">
      <Alert className="" />
      <Header />
      <Hero />
    </div>
  );
}

export default App;
