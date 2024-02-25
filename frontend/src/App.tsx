import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "./Components/Menu/Header";
import CourseTabMenu from "./Components/Menu/Course Panel/CorseTabMenu";
import { EffectSection } from "./Components/EffectSection";
import { ICourse, MODAL_STATES } from "./Components/dto/interfaces";
import { BottomRightButton, Button } from "./Components/Buttons";
import { Register } from "./Components/auth/Register";
import { Login } from "./Components/auth/Login";
import { useCookies } from "react-cookie";

function App() {
  const [modalState, setModalState] = useState<MODAL_STATES>(MODAL_STATES.HIDE);
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const [showLogOut, setshowLogOut] = useState(false);

  function setSession(session: string) {
    setCookie("session", session);
    setshowLogOut((prev) => (prev = true));
  }

  function removeSession() {
    removeCookie("session");
    setshowLogOut((prev) => (prev = false));
  }

  const openModal = (title: string, state: MODAL_STATES) => {
    setModalState(state);
  };
  const closeModal = () => {
    setModalState(MODAL_STATES.HIDE);
  };

  const onAddClick = () => {
    return console.log("add");
  };

  const addSomthing = () => {
    return console.log("try add something");
  };

  const getModal = (state: MODAL_STATES) => {
    switch (state) {
      case MODAL_STATES.SIGN_UP:
        return <Login close={closeModal} setSession={setSession}></Login>;
      case MODAL_STATES.REGISTER:
        return <Register close={closeModal} setSession={setSession}></Register>;
      case MODAL_STATES.CONFIRM:
        return;
      case MODAL_STATES.CREATE_COURSE:
        return;
      case MODAL_STATES.ADD_COURSE:
        return;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="App">
      <Header
        addSomething={onAddClick}
        profileActions={() => removeSession()}
        profileTitle="Выйти"
        show={showLogOut}
      ></Header>
      {cookies.session && (
        <main className="bg-neutral-300 min-h-screen flex flex-col px-5 text-white">
          <section className="lg:mx-20">
            <CourseTabMenu session={cookies.session}></CourseTabMenu>
          </section>
          <BottomRightButton onClick={() => addSomthing()}></BottomRightButton>
        </main>
      )}
      {!cookies.session && (
        <section className="flex flex-col justify-center items-center min-h-screen ">
          <div className="bg-gray-300 p-4 rounded-md shadow-md">
            <p className="text-lg font-medium text-gray-800">
              Необходимо авторизоваться
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                onClick={() => openModal("Hello", MODAL_STATES.REGISTER)}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
              >
                Регистрация
              </button>
              <button
                onClick={() => openModal("Hello", MODAL_STATES.SIGN_UP)}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600"
              >
                Авторизация
              </button>
            </div>
          </div>
        </section>
      )}
      <EffectSection open={modalState !== MODAL_STATES.HIDE} close={closeModal}>
        {getModal(modalState)}
      </EffectSection>
    </div>
  );
}

export default App;
