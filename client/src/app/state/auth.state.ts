import { IUser } from "../types/user";

export interface IAuthState {
  user: IUser | null,
  isAuth: boolean,
  errorMsg: string | null,
}
