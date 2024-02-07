import { IUser } from "../types/user";

export interface AuthState {
  user: IUser | null,
  isAuth: boolean,
  errorMsg: string | null,
}
