import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { authState } from '../state/auth.selector';
import { Observable, switchMap, take } from 'rxjs';
import { AuthState } from '../state/auth.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const apiURL = environment.apiURL
  const authState$: Observable<AuthState> = store.select(authState);
  return authState$.pipe(
    take(1),
    switchMap(authState => {
      if (req.url.startsWith(apiURL) && authState.user && authState.user.accessToken) {
        req = req.clone({
          setHeaders: {
            'X-Authorization': authState.user?.accessToken
          }
        })
      }
      return next(req);
    })
  );
};
