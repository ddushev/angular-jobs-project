import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { AuthApiActions } from '../../state/auth.actions';
import { Router } from '@angular/router';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      switch(error.status) {
        case 403: {
          store.dispatch(AuthApiActions.logoutUser());
          router.navigate(['/login']);
        }
      }
      return throwError(() => error.message)
    })
  );
};
