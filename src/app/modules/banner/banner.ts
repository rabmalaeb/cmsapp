import { Media } from '../media/media';
import { Language } from '../language/language';
import FilterRequest from 'src/app/shared/request';
import { ImageModel } from 'src/app/shared/models/image';

export class Banner extends ImageModel {
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
export class BannerRequest extends FilterRequest {}
