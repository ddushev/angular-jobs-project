import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiURL = environment.apiURL
  if (req.url.startsWith(apiURL)) {
    req = req.clone({
      setHeaders: {
      }
    })
  }
  return next(req);
};
