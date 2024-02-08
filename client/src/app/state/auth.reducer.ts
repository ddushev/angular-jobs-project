import { createReducer, on } from "@ngrx/store";
import { AuthApiActions } from "./auth.actions";
import { IAuthState } from "./auth.state";

export const initialState: IAuthState = {
  user: null,
  isAuth: false,
  errorMsg: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.loginUser, (state) => state),
  on(AuthApiActions.loginUserSuccess, (_state, {user}) => ({
    user,
    isAuth: true,
    errorMsg: null,
  })),
  on(AuthApiActions.loginUserFailure, (_state, {errorMsg}) => ({
    user: null,
    isAuth:false,
    errorMsg,
  })),
  on(AuthApiActions.registerUser, (state) => state),
  on(AuthApiActions.registerUserSuccess, (_state, {user}) => ({
    user,
    isAuth: true,
    errorMsg: null,
  })),
  on(AuthApiActions.registerUserFailure, (_state, {errorMsg}) => ({
    user: null,
    isAuth:false,
    errorMsg,
  })),
  on(AuthApiActions.logoutUser, (state) => state),
  on(AuthApiActions.logoutUserSuccess, () => ({
    user: null,
    isAuth: false,
    errorMsg: null,
  })),
  on(AuthApiActions.logoutUserFailure, (state, {errorMsg}) => ({
    ...state,
    errorMsg,
  })),
  on(AuthApiActions.clearErrorMsg, (state) => ({
    ...state,
    errorMsg: null,
  })),

)
