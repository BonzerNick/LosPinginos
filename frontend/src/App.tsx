import "./App.css";
import { Button } from "./Components/Buttons";
import { useState } from "react";
import { API } from "./Components/api/api";
import { Header } from "./Components/Menu/Header";

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

  const onAddClick = () => {
    return console.log("add");
  };

  const onProfileClick = () => {
    return console.log("profile");
  };

  return (
    // <div></div>
    <div className="App">
      <Header
        addSomething={onAddClick}
        profileActions={onProfileClick}
        addTitle="Добавить что-то"
        profileTitle="Профиль"
      ></Header>
      <main className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
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
