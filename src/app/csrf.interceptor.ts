import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const csrfInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const csrfToken = cookieService.get('XSRF-TOKEN');
  const cloned = req.clone({
    headers: req.headers.set('X-XSRF-TOKEN', csrfToken)
  });
  return next(cloned);
};