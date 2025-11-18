import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '../service/login';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LoginService);

  const token = localStorage.getItem('token');

  // Attach Authorization header if token exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Try refreshing the token
        return authService.refresh().pipe(
          switchMap(response => {
            // Save new token
            localStorage.setItem('token', response.token);
            localStorage.setItem('expiresAt', response.expiresAt);

            // Retry original request with new token
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`
              }
            });
            return next(newReq);
          }),
          catchError(refreshError => {
            // If refresh fails, log out
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
