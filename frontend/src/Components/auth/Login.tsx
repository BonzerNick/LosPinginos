import { useState } from "react";
import { IAuth, User } from "../dto/interfaces";

export function Login({ close }: IAuth) {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.username.trim() || !user.password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    console.log("Login details:", user);
    close();
    setError(""); // Clear error message on successful submission
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full">
        <h2 className="text-2xl mb-4">Авторизация</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block">
              Имя пользователя:
            </label>
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
            <label htmlFor="password" className="block">
              Пароль:
            </label>
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
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
