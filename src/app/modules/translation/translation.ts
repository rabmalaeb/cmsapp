import { LanguageKey } from '../languagekey/languagekey';
import { Language } from '../language/language';
import { Partner } from '../partner/partner';

export class Translation {
  id: number;
  partnerId: number;
  languageId: number;
  languagekeyId: number;
  partner: Partner;
  language: Language;
  languagekey: LanguageKey;
  value: string;
}
