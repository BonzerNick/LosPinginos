export interface ICourse {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
}

export const enum MODAL_STATES {
  HIDE = "HIDE",
  SIGN_UP = "SIGN_UP",
  REGISTER = "REGISTER",
  CONFIRM = "CONFIRM",
  ADD_COURSE = "ADD_COURSE",
  CREATE_COURSE = "CREATE_COURSE",
}
export interface User {
  username: string;
  password: string;
}

export interface RegUser {
  username: string;
  email: string;
  password: string;
  userType: string;
}

export interface IAuth {
  setSession: Function;
  close: Function;
}

export const enum USER_TYPE {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}
