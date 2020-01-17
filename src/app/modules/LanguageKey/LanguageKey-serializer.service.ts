import { Injectable } from '@angular/core';
import { LanguageKey } from './languagekey';
import { CategorySerializerService } from '../category/category-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageKeySerializerService {
  constructor(private categorySerializer: CategorySerializerService) {}

  getLanguageKey(languageKeyResponse: any) {
    if (!languageKeyResponse) {
      return null;
    }
    const languageKey = new LanguageKey();
    languageKey.id = parseInt(languageKeyResponse.id, 0);
    languageKey.name = languageKeyResponse.attributes.name;
    languageKey.description = languageKeyResponse.attributes.description;
    return languageKey;
  }
}
