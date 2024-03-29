import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { RegUser, User } from "../dto/interfaces";

const DEFAULT_TIMEOUT = 5000;

const instance = (timeout = DEFAULT_TIMEOUT) => {
  const request_id = uuidv4();
  console.log(`Create instance with request_id ${request_id}`);
  return axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: timeout,
  });
};

export const API = {
  async login(user: User) {
    return await instance()
      .post(`/login`, user)
      .then((responce) => {
        return responce;
      });
  },

  async fetchCourses(session: string) {
    return await instance()
      .post(`/user/courses`, { session_key: session })
      .then((responce) => {
        return responce;
      });
  },

  async signup(user: RegUser) {
    return await instance()
      .post(`/signup`, user)
      .then((responce) => {
        return responce;
      });
  },
};
