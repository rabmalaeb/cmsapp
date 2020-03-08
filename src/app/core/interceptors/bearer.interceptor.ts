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
export class BearerInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.authenticationService.isLoggedIn) {
      const loginToken = this.authenticationService.getCurrentUser().token;
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${loginToken}`)
      });
    }
    return next.handle(request);
  }
}
