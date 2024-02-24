export interface ICourse {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
}

export const enum PRESETS_MODAL_STATES {
  HIDE = "HIDE",
  SIGN_UP = "SIGN_UP",
  REGISTER = "REGISTER",
  CONFIRM = "CONFIRM",
  ADD_COURSE = "ADD_COURSE",
  CREATE_COURSE = "CREATE_COURSE",
}
