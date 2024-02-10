import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AuthApiActions, AuthPersistActions } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginUser),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((user) => AuthApiActions.loginUserSuccess({ user })),
          catchError((error) =>
            of(
              AuthApiActions.loginUserFailure({ errorMsg: error.error.message })
            )
          )
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.registerUser),
      exhaustMap(({ registerData }) =>
        this.authService.register(registerData).pipe(
          map((user) =>
            AuthApiActions.registerUserSuccess({
              user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
                _id: user._id,
                accessToken: user.accessToken,
              },
            })
          ),
          catchError((error) =>
            of(
              AuthApiActions.registerUserFailure({
                errorMsg: error.error.message,
              })
            )
          )
        )
      )
    )
  );

  loginOrRegisterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthApiActions.loginUserSuccess,
          AuthApiActions.registerUserSuccess
        ),
        tap(({ user }) => {
          localStorage.setItem('authData', JSON.stringify(user));
          this.router.navigate(['/job-listings']);
        })
      ),
    { dispatch: false }
  );

  loadAuthDataFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPersistActions.loadAuthDataFromLocalStorage),
      map(() => {
        const userStr = localStorage.getItem('authData');
        if (userStr) {
          const user = JSON.parse(userStr);
          return AuthApiActions.loginUserSuccess({ user });
        } else {
          return AuthPersistActions.noSessionPersisted();
        }
      })
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logoutUser),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => (AuthApiActions.logoutUserSuccess())),
          catchError((_error) =>
            of(AuthApiActions.logoutUserFailure()),
          ),
            finalize(() => {
              localStorage.removeItem('authData');
            })
        )
      )
    )
  );
}
