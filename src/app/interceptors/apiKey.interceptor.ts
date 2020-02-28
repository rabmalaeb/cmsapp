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
        apiKey: 'kpIVrmD9PPoFssuS952OSBpJlQdOxjh46GHSyCfrA0DIVySAIQxZduff9Qmq' //rabih
        // apiKey: '0TarKCt2QtR19PVZ6yW2emKN7d2CNlvczO50IcFfapWrdjRobcEddHuojd7k' //ramzi
      }
    });
    return next.handle(request);
  }
}
