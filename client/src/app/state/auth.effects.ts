import { Actions, createEffect, ofType } from '@ngrx/effects';

import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { UserService } from '../account/user/user.service';
import { AuthApiActions } from './auth.actions';

export const loginUser$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(AuthApiActions.loginUser),
      exhaustMap(({ credentials }) =>
        userService.login(credentials).pipe(
          map((user) => AuthApiActions.loginUserSuccess({ user })),
          catchError((error) => {
            console.error('Login Error:', error);
            return of(
              AuthApiActions.loginUserFailure({ errorMsg: error.error.message })
            );
          })
        )
      )
    );
  },
  { functional: true }
);

export const displayErrorAlert$ = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(AuthApiActions.loginUserFailure),
      tap(({ errorMsg }) => alert(errorMsg))
    );
  },
  { functional: true, dispatch: false }
);
