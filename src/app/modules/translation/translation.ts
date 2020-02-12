import { Language } from '../language/language';
import { Partner } from '../partner/partner';
import { LanguageKey } from '../language-key/language-key';

export class Translation {
  id: number;
  partnerId: number;
  languageId: number;
  languageKeyId: number;
  partner: Partner;
  language: Language;
  languageKey: LanguageKey;
  value: string;
}
