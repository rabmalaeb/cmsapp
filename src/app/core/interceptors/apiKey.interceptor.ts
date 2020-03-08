import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.authenticationService.isLoggedIn) {
      return next.handle(request);
    }
    request = request.clone({
      setParams: {
        ...request.body,
        apiKey: this.authenticationService.getCurrentUser().apiKey
      }
    });
    return next.handle(request);
  }
}
