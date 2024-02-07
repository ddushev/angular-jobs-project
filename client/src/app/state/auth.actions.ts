import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICredentials } from "../types/credentials";
import { IUser } from "../types/user";


export const AuthApiActions = createActionGroup({
  source: 'Users API',
  events: {
    loginUser: props<{credentials: ICredentials}>(),
    loginUserSuccess: props<{user: IUser}>(),
    loginUserFailure: props<{errorMsg: string}>(),
    logoutUser: emptyProps(),
    logoutUserSuccess: emptyProps(),
    logoutUserFailure: props<{errorMsg: string}>(),
  }
})
