import logo from "./logo.svg";
import "./App.css";
import { Button } from "./Components/Buttons";
import { useState } from "react";
import { API } from "./Components/api/api";

function App() {
  const [show, setShow] = useState(false);
  const [plarform, SetPlatform] = useState("Unknown");

  const showPlatform = () => {
    setShow((prev) => !prev);
  };

  const onClick = async () => {
    try {
      const response = await API.getPlatform(10);
      SetPlatform(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      <header className="p-3 text-center bg-blue-900 text-white text-3xl flex justify-center">
        <ul className=" flex gap-10 text-sm">
          {["Aboba1", "Aboba2", "Aboba3", , "Aboba4"].map((value, k) => {
            return <li key={k}>{value}</li>;
          })}
        </ul>
      </header>
      <main className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <section className="flex gap-5 m-5">
          <Button onClick={showPlatform} title={"Показать платформу"}></Button>
          <Button onClick={onClick} title={"Узнать платформу"}></Button>
        </section>
        {show && <span>{plarform.toString()}</span>}
      </main>
    </div>
  );
}

export default App;
