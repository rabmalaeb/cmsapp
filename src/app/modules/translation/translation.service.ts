import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { map } from 'rxjs/operators';
import { TranslationSerializerService } from './translation-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private httpService: HttpService,
    private translationSerializer: TranslationSerializerService,
  ) { }

  getTranslations() {
    return this.httpService.request('language-partner-translations', {}).pipe(map(response => {
      return response.map(data => this.translationSerializer.getTranslation(data));
    }));
  }

  getTranslation(id: number) {
    return this.httpService.request(`language-partner-translations/${id}`, {}).pipe(map(({ data }) => {
      return this.translationSerializer.getTranslation(data);
    }));
  }

  addTranslation(params) {
    return this.httpService.post('language-partner-translations', { ...params }).pipe(map(({ data }) => {
      return this.translationSerializer.getTranslation(data);
    }));
  }

  updateTranslation(id, params) {
    return this.httpService.put(`language-partner-translations/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.translationSerializer.getTranslation(data);
    }));
  }

  deleteTranslation(id: number) {
    return this.httpService.delete(`language-partner-translations/${id}`).pipe(map(response => {
      return response.map(data => this.translationSerializer.getTranslation(data));
    }));
  }
}
