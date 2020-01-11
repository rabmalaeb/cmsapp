import { Injectable } from '@angular/core';
import { LanguageKey } from './languagekey';
import { CategorySerializerService } from '../category/category-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageKeySerializerService {

  constructor(
    private categorySerializer: CategorySerializerService
  ) { }

  getLanguageKey(languagekeyResponse: any) {
    if (!languagekeyResponse) {
      return null;
    }
    const languagekey = new LanguageKey();
    languagekey.id = parseInt(languagekeyResponse.id, 0);
    languagekey.name = languagekeyResponse.attributes.name;
    languagekey.description = languagekeyResponse.attributes.description;
    return languagekey;
  }
}
