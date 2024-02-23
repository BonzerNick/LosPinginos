import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// NOTE (vkostemko): In the bot, it took 30 ms, to clarify why this is so
const DEFAULT_TIMEOUT = 1000;

const instance = (timeout = DEFAULT_TIMEOUT) => {
  const request_id = uuidv4();
  console.log(`Create instance with request_id ${request_id}`);
  return axios.create({
    baseURL: "http://localhost:5000/",
    timeout: timeout,
  });
};

export const API = {
  async getPlatform(num: number) {
    return await instance()
      .get(`/chain-platform-info/${num}`)
      .then((responce) => {
        return responce;
      });
  },
};
