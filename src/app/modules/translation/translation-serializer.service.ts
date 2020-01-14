import { Injectable } from '@angular/core';
import { Translation } from './translation';
import { PartnerSerializerService } from '../partner/partner-serializer.service';
import { LanguageSerializerService } from '../language/language-serializer.service';
import { LanguageKeySerializerService } from '../languageKey/languageKey-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationSerializerService {

  constructor(
    private partnerSerializerService: PartnerSerializerService,
    private languageSerializerService: LanguageSerializerService,
    private languageKeySerializerService: LanguageKeySerializerService,
  ) { }

  getTranslation(translationResponse: any) {
    if (!translationResponse) {
      return null;
    }
    const translation = new Translation();
    translation.id = parseInt(translationResponse.id, 0);
    translation.languageId = parseInt(translationResponse.attributes.languageId, 0);
    translation.partnerId = parseInt(translationResponse.attributes.partnerId, 0);
    translation.languageKeyId = parseInt(translationResponse.attributes.languageKeyId, 0);
    translation.partner = this.partnerSerializerService.getPartner(translationResponse.relationships.partner);
    translation.language = this.languageSerializerService.getLanguage(translationResponse.relationships.language);
    translation.languageKey = this.languageKeySerializerService.getLanguageKey(translationResponse.relationships.languageKey);
    translation.value = translationResponse.attributes.value;
    return translation;
  }
}
