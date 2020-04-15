import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
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

  private url: string = environment.apiUrl;

  get(endpoint: string, params: any) {
    const url = `${this.url}${endpoint}`;
    return this.http.get<any>(url, { params, withCredentials: false }).pipe(
      map(response => {
        return response;
      })
    );
  }

  post(endpoint: string, data: any) {
    const url = `${this.url}${endpoint}`;
    return this.http.post<any>(url, data, { withCredentials: false }).pipe(
      map(response => {
        return response;
      })
    );
  }

  put(endpoint: string, data: any) {
    const url = `${this.url}${endpoint}`;
    return this.http.put<any>(url, data, { withCredentials: false }).pipe(
      map(response => {
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
}
