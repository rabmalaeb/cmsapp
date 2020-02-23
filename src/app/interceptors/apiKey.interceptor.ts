import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setParams: {
        ...request.body,
        apiKey: 'lakslaskdaksdmaskdmkamskdasd'
      }
    });
    return next.handle(request);
  }
}
