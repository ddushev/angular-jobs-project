import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const authState = createFeatureSelector<AuthState>('authState');
