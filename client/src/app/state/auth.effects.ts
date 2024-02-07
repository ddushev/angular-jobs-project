import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { UserService } from '../account/user/user.service';
import { AuthApiActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginUser),
      exhaustMap(({ credentials }) =>
        this.userService.login(credentials).pipe(
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
        this.userService.logout().pipe(
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
