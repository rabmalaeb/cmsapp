import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { LanguageSerializerService } from './language-serializer.service';
import { map } from 'rxjs/operators';
import { LanguageRequest } from './language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private httpService: HttpService,
    private languageSerializer: LanguageSerializerService
  ) { }


  getLanguages(languageRequest: LanguageRequest) {
    return this.httpService.request('languages', languageRequest).pipe(map(response => {
      return response.map(data => this.languageSerializer.getLanguage(data));
    }));
  }

  getLanguage(id: number) {
    return this.httpService.request(`languages/${id}`, {}).pipe(map(({ data }) => {
      return this.languageSerializer.getLanguage(data);
    }));
  }

  addLanguage(params) {
    return this.httpService.post('languages', { ...params }).pipe(map(({ data }) => {
      return this.languageSerializer.getLanguage(data);
    }));
  }

  updateLanguage(id, params) {
    return this.httpService.put(`languages/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.languageSerializer.getLanguage(data);
    }));
  }

  deleteLanguage(id: number) {
    return this.httpService.delete(`languages/${id}`).pipe(map(response => {
      return response.map(data => this.languageSerializer.getLanguage(data));
    }));
  }
}
