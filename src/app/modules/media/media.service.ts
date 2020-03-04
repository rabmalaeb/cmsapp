import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

import { map } from 'rxjs/operators';
import { MediaSerializerService } from './media.serializer.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private httpService: HttpService,
    private mediaSerializer: MediaSerializerService
  ) { }

  getMedias() {
    return this.httpService.request('medias', {}).pipe(map(response => {
      return response.map(data => this.mediaSerializer.getMedia(data));
    }));
  }

  getMedia(id: number) {
    return this.httpService.request(`medias/${id}`, {}).pipe(map(({ data }) => {
      return this.mediaSerializer.getMedia(data);
    }));
  }

  addMedia(formData: FormData) {
    return this.httpService.post('medias', formData).pipe(map(({ data }) => {
      return this.mediaSerializer.getMedia(data);
    }));
  }

  updateMedia(id, params) {
    return this.httpService.put(`medias/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.mediaSerializer.getMedia(data);
    }));
  }

  deleteMedia(id: number) {
    return this.httpService.delete(`medias/${id}`).pipe(map(response => {
      return response.map(data => this.mediaSerializer.getMedia(data));
    }));
  }
}
