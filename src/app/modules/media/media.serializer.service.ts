import { Injectable } from '@angular/core';
import { Media } from './media';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaSerializerService {
  constructor() {}

  private imagePath = `${environment.serverUrl}/storage/`;

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
