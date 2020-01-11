import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LanguageKeySerializerService } from './languagekey-serializer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageKeyService {

  constructor(
    private httpService: HttpService,
    private languagekeySerializer: LanguageKeySerializerService,
  ) { }

  getLanguageKeys() {
    return this.httpService.request('language-keys', {}).pipe(map(response => {
      return response.map(data => this.languagekeySerializer.getLanguageKey(data));
    }));
  }

  getLanguageKey(id: number) {
    return this.httpService.request(`language-keys/${id}`, {}).pipe(map(({ data }) => {
      return this.languagekeySerializer.getLanguageKey(data);
    }));
  }

  addLanguageKey(params) {
    return this.httpService.post('language-keys', { ...params }).pipe(map(({ data }) => {
      return this.languagekeySerializer.getLanguageKey(data);
    }));
  }

  updateLanguageKey(id, params) {
    return this.httpService.put(`language-keys/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.languagekeySerializer.getLanguageKey(data);
    }));
  }

  deleteLanguageKey(id: number) {
    return this.httpService.delete(`language-keys/${id}`).pipe(map(response => {
      return response.map(data => this.languagekeySerializer.getLanguageKey(data));
    }));
  }
}
