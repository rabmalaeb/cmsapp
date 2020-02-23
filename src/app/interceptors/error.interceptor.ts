import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogoutService } from '../services/logout.service';
import { ErrorResponse } from '../models/general';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logoutService: LogoutService) {}

  DEFAULT_ERROR_MESSAGE = 'An Error has occurred. Please try again';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          // auto logout if 401 response returned from api
          this.logoutService.logout();
        } else if (error.status === 500) {
          console.warn('thrown error ', error);
          return throwError({
            status: 500,
            message: this.DEFAULT_ERROR_MESSAGE
          });
        }
        return throwError(this.handleErrorResponse(error));
      })
    );
  }

  /**
   * handle error response and return ErrorResponse
   */
  private handleErrorResponse(error: HttpErrorResponse): ErrorResponse {
    let message = error.message ? error.message : error.statusText;
    const status = error.status;
    if (error.error) {
      if (error.error.errors) {
        message = error.error.errors[0].detail;
      } else {
        message = error.error.message
          ? error.error.message
          : this.DEFAULT_ERROR_MESSAGE;
      }
    }
    return {
      status,
      message
    };
  }
}
