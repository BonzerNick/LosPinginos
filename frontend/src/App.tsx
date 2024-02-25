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
import { TEST_COURSES } from "./constants";
import { FORM } from "./Components/Menu/Form";
import Sidebar from "./Components/Menu/Sidebar";
import Widget from "./Components/Menu/windet";

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
    setModalState(MODAL_STATES.CREATE_COURSE);
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
        return <FORM close={closeModal} setSession={setSession}></FORM>;
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
      {/* <Sidebar
        tasks={[
          { id: 1, title: "Лекция" },
          { id: 2, title: "Задание 1" },
          { id: 2, title: "Задание 2" },
          { id: 4, title: "Задание 3" },
          { id: 4, title: "Задание 4" },
          { id: 4, title: "Задание 5" },
        ]}
      ></Sidebar> */}
      <div className="flex justify-center items-center h-screen">
        <Widget
          title="Введение в Искусственный Интеллект и Машинное Обучение"
          description="
          Описание:
          Курс 
          
          Этот курс нацелен на студентов и профессионалов без предварительного опыта в области Искусственного Интеллекта (ИИ) и Машинного Обучения (МО). Он предоставляет уникальную возможность ознакомиться с основными концепциями, методами и инструментами, используемыми в области ИИ и МО.
          
          В ходе курса вы узнаете:
          
              Основные концепции и терминологию Искусственного Интеллекта и Машинного Обучения.
              Различные подходы к обучению моделей Машинного Обучения, включая надзорное и безнадзорное обучение.
              Применение Машинного Обучения в различных областях, таких как медицина, финансы, технологии и другие.
              Инструменты и библиотеки, используемые для реализации алгоритмов Машинного Обучения.
          
          Курс включает в себя лекции, практические занятия и проекты, которые помогут вам применить полученные знания на практике. Наша цель - подготовить вас к успешному старту в области Искусственного Интеллекта и Машинного Обучения и вдохновить на дальнейшее обучение и исследования в этой захватывающей области.
          
          Присоединяйтесь к нашему курсу и откройте для себя увлекательный мир Искусственного Интеллекта и Машинного Обучения!"
          githubLink="https://github.com/example/sample"
        />
      </div>
      {/* {!cookies.session && (
        <main className="bg-neutral-300 min-h-screen flex flex-col px-5 text-white">
          <section className="lg:mx-20">
            <CourseTabMenu
              courses={TEST_COURSES}
              session={cookies.session}
            ></CourseTabMenu>
          </section>
          <BottomRightButton onClick={() => addSomthing()}></BottomRightButton>
        </main> 
      )}*/}
      {/* {!cookies.session && (
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
      )} */}
      {/* <EffectSection open={modalState !== MODAL_STATES.HIDE} close={closeModal}>
        {getModal(modalState)}
      </EffectSection> */}
    </div>
  );
}

export default App;
