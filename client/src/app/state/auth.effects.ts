import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../account/auth/auth.service';
import { AuthApiActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginUser),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((user) => AuthApiActions.loginUserSuccess({ user })),
          catchError((error) =>
            of(AuthApiActions.loginUserFailure({ errorMsg: error.error.message }))
          )
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logoutUser),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthApiActions.logoutUserSuccess()),
          catchError((error) =>
            of(AuthApiActions.logoutUserFailure({ errorMsg: error.error.message }))
          )
        )
      )
    )
  );

  displayErrorAlert$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginUserFailure, AuthApiActions.logoutUserFailure),
        tap(({ errorMsg }) => alert(errorMsg))
      ),
    { dispatch: false }
  );
}
