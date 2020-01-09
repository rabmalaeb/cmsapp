import { Injectable } from '@angular/core';
import { Language } from './language';

@Injectable({
  providedIn: 'root'
})
export class LanguageSerializerService {

  constructor() { }

  getLanguage(languageResponse: any) {
    if (!languageResponse) {
      return null;
    }
    const language = new Language();
    language.id = parseInt(languageResponse.id, 0);
    language.name = languageResponse.attributes.name;
    language.code = languageResponse.attributes.code;
    return language;
  }
}
