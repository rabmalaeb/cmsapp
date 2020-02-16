import { Media } from '../media/media';
import { Language } from '../language/language';

export class Banner {
  id: number;
  name: string;
  description: string;
  link: string;
  mediaId: number;
  partnerId = 2;
  media: Media;
  languageId: number;
  language: Language;
}
