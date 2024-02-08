import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICredentials } from "../types/credentials";
import { IUser } from "../types/user";
import { IRegisterData } from "../types/registerData";


export const AuthApiActions = createActionGroup({
  source: 'Users API',
  events: {
    loginUser: props<{credentials: ICredentials}>(),
    loginUserSuccess: props<{user: IUser}>(),
    loginUserFailure: props<{errorMsg: string}>(),
    registerUser: props<{registerData: IRegisterData}>(),
    registerUserSuccess: props<{user: IUser}>(),
    registerUserFailure: props<{errorMsg: string}>(),
    logoutUser: emptyProps(),
    logoutUserSuccess: emptyProps(),
    logoutUserFailure: props<{errorMsg: string}>(),
  }
})
