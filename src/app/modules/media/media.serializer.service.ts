import { Injectable } from '@angular/core';
import { Media } from './media';

@Injectable({
  providedIn: 'root'
})
export class MediaSerializerService {

  constructor() { }

  private imagePath = 'http://192.168.10.10/storage/';

  getMedia(mediaResponse: any) {
    if (!mediaResponse) {
      return null;
    }
    const media = new Media();
    media.id = mediaResponse.id;
    media.name = mediaResponse.attributes.name;
    media.imageUrl = `${this.imagePath}${mediaResponse.attributes.name}`;
    media.type = mediaResponse.attributes.type;
    media.size = mediaResponse.attributes.size;
    return media;
  }
}
