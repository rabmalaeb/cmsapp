import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { LanguageKeySerializerService } from './language-key-serializer.service';
import { map } from 'rxjs/operators';
import { LanguageKeyRequest, LanguageKey } from './language-key';

@Injectable({
  providedIn: 'root'
})
export class LanguageKeyService {
  constructor(
    private httpService: HttpService,
    private languageKeySerializer: LanguageKeySerializerService
  ) {}

  getLanguageKeys(languageKeyRequest: LanguageKeyRequest) {
    return this.httpService.get('language-keys', languageKeyRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item =>
            this.languageKeySerializer.getLanguageKey(item)
          ),
          paginator
        };
      })
    );
  }

  getLanguageKey(id: number) {
    return this.httpService.get(`language-keys/${id}`, {}).pipe(
      map(({ data }) => {
        return this.languageKeySerializer.getLanguageKey(data);
      })
    );
  }

  addLanguageKey(params: LanguageKey) {
    return this.httpService.post('language-keys', { ...params }).pipe(
      map(({ data }) => {
        return this.languageKeySerializer.getLanguageKey(data);
      })
    );
  }

  updateLanguageKey(id: number, params: LanguageKey) {
    return this.httpService.put(`language-keys/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.languageKeySerializer.getLanguageKey(data);
      })
    );
  }

  deleteLanguageKey(id: number) {
    return this.httpService.delete(`language-keys/${id}`).pipe(
      map(response => {
        return response.map(data =>
          this.languageKeySerializer.getLanguageKey(data)
        );
      })
    );
  }
}
