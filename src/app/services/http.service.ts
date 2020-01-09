import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { isArray } from 'util';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  /**
   *
   * @param http HttpClient instance that handles api calls
   */
  constructor(
    private http: HttpClient,
  ) { }

  url: string = environment.apiUrl;
  data: any;

  request(endpoint: string, data: any) {
    this.data = data;

    let httpParams = new HttpParams();
    const url = `${this.url}${endpoint}`;
    Object.keys(data).forEach(key => {
      httpParams = httpParams.append(key, data[key]);
    });

    return this.http.get<any>(url, { params: httpParams, withCredentials: false }).pipe(
      map(response => {
        this.checkErrors(data, response);
        return response;
      })
    );
  }

  post(endpoint: string, data: any) {
    this.data = data;
    const url = `${this.url}${endpoint}`;
    return this.http.post<any>(url, data, { withCredentials: false }).pipe(
      map(response => {
        this.checkErrors(data, response);
        return response;
      })
    );
  }

  put(endpoint: string, data: any) {
    this.data = data;
    const url = `${this.url}${endpoint}`;
    return this.http.put<any>(url, data, { withCredentials: false }).pipe(
      map(response => {
        this.checkErrors(data, response);
        return response;
      })
    );
  }

  delete(endpoint: string) {
    const url = `${this.url}${endpoint}`;
    return this.http.delete<any>(url, { withCredentials: false }).pipe(
      map(response => {
        return response;
      })
    );
  }

  checkErrors(data: any, response: any) {
    if (response && response.errors) {
      if (isArray(response.errors)) {
        response.errors.forEach(error => {
          this.checkError(error);
        });
      } else {
        this.checkError(response.errors);
      }
    }
  }

  checkError(error: any) {
    // if (error.code === ErrorCodes.Bearer) {
    //   console.error('data is ', this.data);
    //   localStorage.setItem('sessionExpired', 'true');
    //   this.logoutService.logout();
    // }
  }
}
