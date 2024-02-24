import "./App.css";
import { useState } from "react";
import { API } from "./Components/api/api";
import { Header } from "./Components/Menu/Header";
import CourseTabMenu from "./Components/Menu/Menu";
import { v4 as uuidv4 } from "uuid";
import { EffectSection } from "./Components/EffectSection";
import { PRESETS_MODAL_STATES } from "./Components/dto/interfaces";

function App() {
  const [modalState, setModalState] = useState<PRESETS_MODAL_STATES>(
    PRESETS_MODAL_STATES.HIDE
  );

  const openModal = (title: string, state: PRESETS_MODAL_STATES) => {
    setModalState(state);

    // setModalTitle(title);
  };
  const closeModal = () => {
    setModalState(PRESETS_MODAL_STATES.HIDE);
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
              {
                id: uuidv4(),
                title: "Aboba1",
                desc: "desc",
                thumbnail: "https://",
              },
              {
                id: uuidv4(),
                title: "Aboba2",
                desc: "desc",
                thumbnail: "https://",
              },
              {
                id: uuidv4(),
                title: "Aboba3",
                desc: "desc",
                thumbnail: "https://",
              },
              {
                id: uuidv4(),
                title: "Aboba4",
                desc: "desc",
                thumbnail: "https://",
              },
              {
                id: uuidv4(),
                title: "Aboba5",
                desc: "desc",
                thumbnail: "https://",
              },
              {
                id: uuidv4(),
                title: "Aboba6",
                desc: "desc",
                thumbnail: "https://",
              },
            ]}
          ></CourseTabMenu>
        </section>
        <EffectSection
          open={modalState !== PRESETS_MODAL_STATES.HIDE}
          close={closeModal}
        >
          {<div> ABOBA</div>}
        </EffectSection>
        <button
          onClick={() => openModal("Hello", PRESETS_MODAL_STATES.SIGN_UP)}
        >
          SIGN UP
        </button>
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
