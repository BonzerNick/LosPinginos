import "./App.css";
import { Button } from "./Components/Buttons";
import { useState } from "react";
import { API } from "./Components/api/api";
import { Header } from "./Components/Menu/Header";
import TableOfCourses from "./Components/Menu/Course Panel/TableCourses";
import CourseTabMenu from "./Components/Menu/Menu";

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
    <div className="App">
      <Header
        addSomething={onAddClick}
        profileActions={onProfileClick}
        addTitle="Добавить что-то"
        profileTitle="Профиль"
      ></Header>
      <main className="bg-neutral-900 min-h-screen flex flex-col p-5 text-white">
        <section className="xl:mx-40 md:20">
          {/* <TableOfCourses */}
          <CourseTabMenu
            courses={[
              { id: 12, title: "Aboba1", desc: "desc", thumbnail: "https://" },
              { id: 12, title: "Aboba2", desc: "desc", thumbnail: "https://" },
              { id: 12, title: "Aboba3", desc: "desc", thumbnail: "https://" },
              { id: 12, title: "Aboba4", desc: "desc", thumbnail: "https://" },
              { id: 12, title: "Aboba5", desc: "desc", thumbnail: "https://" },
              { id: 12, title: "Aboba6", desc: "desc", thumbnail: "https://" },
            ]}
          ></CourseTabMenu>
        </section>
        {/* <section className="flex gap-5 m-5">
          <Button onClick={showPlatform} title={"Показать платформу"}></Button>
          <Button onClick={onClick} title={"Узнать платформу"}></Button>
        </section>
        {show && <span>{plarform.toString()}</span>} */}
      </main>
    </div>
  );
}

export default App;
