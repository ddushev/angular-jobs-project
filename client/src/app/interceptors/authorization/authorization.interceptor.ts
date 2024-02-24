import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { AuthApiActions } from '../../state/auth.actions';
import { Router } from '@angular/router';
import { PATHS } from '../../constants/paths';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if(error.status === 403 && error.error.message === "Invalid access token") {
        store.dispatch(AuthApiActions.logoutUser());
        router.navigate(['/', PATHS.LOGIN]);
      }

      return throwError(() => error)
    })
  );
};
