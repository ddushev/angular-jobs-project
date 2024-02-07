import { createReducer, on } from "@ngrx/store";
import { AuthApiActions } from "./auth.actions";
import { AuthState } from "./auth.state";

export const initialState: AuthState = {
  user: null,
  isAuth: false,
  errorMsg: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.loginUser, (state) => state),
  on(AuthApiActions.loginUserSuccess, (state, {user}) => ({
    ...state,
    user,
    isAuth: true,
  })),
  on(AuthApiActions.loginUserFailure, (state, {errorMsg}) => ({
    user: null,
    isAuth:false,
    errorMsg,
  })),

)
