import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const csrfInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const http = inject(HttpClient);
  let csrfToken: string | null = localStorage.getItem('csrfToken');

  if (csrfToken) {
    req = req.clone({
      setHeaders: {
        'X-CSRF-Token': csrfToken
      }
    });
  }

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status === 403 && error.error.message === 'Invalid CSRF token') {
        return http.get<any>('/csrf-token').pipe(
          switchMap((token: any) => {
            csrfToken = token.csrfToken;
            localStorage.setItem('csrfToken', csrfToken ?? '');
            const clonedRequest = req.clone({
              setHeaders: {
                'X-CSRF-Token': csrfToken!
              }
            });
            return next(clonedRequest);
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
};
