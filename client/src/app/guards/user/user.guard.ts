import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { IAuthState } from '../../state/auth.state';
import { authState } from '../../state/auth.selector';

export const userGuard: CanActivateFn = (_route, _state) => {
  const store = inject(Store);
  const router = inject(Router);
  const authState$: Observable<IAuthState> = store.select(authState);

  return authState$.pipe(
    take(1),
    map((authState) => {
      if (authState.isAuth) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
