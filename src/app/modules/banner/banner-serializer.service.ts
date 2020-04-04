import { Injectable } from '@angular/core';
import { Banner } from './banner';
import { MediaSerializerService } from '../media/media.serializer.service';
import { LanguageSerializerService } from '../language/language-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class BannerSerializerService {
  constructor(
    private languageSerializer: LanguageSerializerService,
    private mediaSerializer: MediaSerializerService
  ) {}

  getBanner(bannerResponse: any) {
    if (!bannerResponse) {
      return null;
    }
    const banner = new Banner();
    banner.id = parseInt(bannerResponse.id, 0);
    banner.name = bannerResponse.attributes.name;
    banner.description = bannerResponse.attributes.description;
    banner.link = bannerResponse.attributes.link;
    banner.mediaId = bannerResponse.attributes.mediaId;
    banner.media = this.mediaSerializer.getMedia(
      bannerResponse.relationships.media
    );
    banner.language = this.languageSerializer.getLanguage(
      bannerResponse.relationships.language
    );
    banner.languageId = bannerResponse.attributes.languageId;
    return banner;
  }
}
