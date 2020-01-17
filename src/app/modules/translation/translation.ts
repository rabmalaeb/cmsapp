import { LanguageKey } from '../languagekey/languagekey';
import { Language } from '../language/language';
import { Partner } from '../partner/partner';

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
