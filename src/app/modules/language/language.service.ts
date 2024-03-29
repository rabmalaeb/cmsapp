import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { LanguageSerializerService } from './language-serializer.service';
import { map } from 'rxjs/operators';
import { LanguageRequest, Language } from './language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(
    private httpService: HttpService,
    private languageSerializer: LanguageSerializerService
  ) {}

  getLanguages(languageRequest: LanguageRequest) {
    return this.httpService.get('languages', languageRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.languageSerializer.getLanguage(item)),
          paginator
        };
      })
    );
  }

  getLanguage(id: number) {
    return this.httpService.get(`languages/${id}`, {}).pipe(
      map(({ data }) => {
        return this.languageSerializer.getLanguage(data);
      })
    );
  }

  addLanguage(params: Language) {
    return this.httpService.post('languages', { ...params }).pipe(
      map(({ data }) => {
        return this.languageSerializer.getLanguage(data);
      })
    );
  }

  updateLanguage(id: number, params: Language) {
    return this.httpService.put(`languages/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.languageSerializer.getLanguage(data);
      })
    );
  }

  deleteLanguage(id: number) {
    return this.httpService.delete(`languages/${id}`).pipe(
      map(response => {
        return response.map(data => this.languageSerializer.getLanguage(data));
      })
    );
  }
}
