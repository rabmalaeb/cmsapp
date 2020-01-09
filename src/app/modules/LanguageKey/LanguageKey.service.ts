import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LanguageKeySerializerService } from './LanguageKey-serializer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageKeyService {

  constructor(
    private httpService: HttpService,
    private languageKeySerializer: LanguageKeySerializerService,
  ) { }

  getLanguageKeys() {
    return this.httpService.request('language-keys', {}).pipe(map(response => {
      return response.map(data => this.languageKeySerializer.getLanguageKey(data));
    }));
  }

  getLanguageKey(id: number) {
    return this.httpService.request(`language-keys/${id}`, {}).pipe(map(({ data }) => {
      return this.languageKeySerializer.getLanguageKey(data);
    }));
  }

  addLanguageKey(params) {
    return this.httpService.post('language-keys', { ...params }).pipe(map(({ data }) => {
      return this.languageKeySerializer.getLanguageKey(data);
    }));
  }

  updateLanguageKey(id, params) {
    return this.httpService.put(`language-keys/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.languageKeySerializer.getLanguageKey(data);
    }));
  }

  deleteLanguageKey(id: number) {
    return this.httpService.delete(`language-keys/${id}`).pipe(map(response => {
      return response.map(data => this.languageKeySerializer.getLanguageKey(data));
    }));
  }
}
