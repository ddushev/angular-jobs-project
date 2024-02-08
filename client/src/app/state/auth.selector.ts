import { createFeatureSelector } from "@ngrx/store";
import { IAuthState } from "./auth.state";

export const authState = createFeatureSelector<IAuthState>('authState');
