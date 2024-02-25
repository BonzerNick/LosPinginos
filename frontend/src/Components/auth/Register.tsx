import { useState } from "react";
import { IAuth, RegUser, USER_TYPE, User } from "../dto/interfaces";
import { API } from "../api/api";

export function Register({ close, setSession }: IAuth) {
  const [user, setUser] = useState<RegUser>({
    username: "",
    email: "",
    password: "",
    userType: USER_TYPE.STUDENT,
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.username.trim() || !user.password.trim() || !user.email.trim()) {
      setError("Пожалуйста введите все необходимые данные.");
      return;
    }
    console.log("Registration details:", user);

    try {
      const response = await API.signup(user);
      console.log(response);
      if (response.status === 200) {
        alert("Успешная регистрация");
        // setSession(response.data.session);
        setError("");
        close();
      } else {
        alert("Что-то пошло не так, попробуйте снова.");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center rounded">
      <div className="bg-gray-100 p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Регистрация</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email">Почта:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="userType" className="block">
              Тип пользователя:
            </label>
            <select
              id="userType"
              name="userType"
              value={user.userType}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value={USER_TYPE.STUDENT}>Студент</option>
              <option value={USER_TYPE.TEACHER}>Преподователь</option>
              <option value={USER_TYPE.ADMIN}>Администратор</option>
            </select>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
          >
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
}
