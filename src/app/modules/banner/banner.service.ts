import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { BannerSerializerService } from './banner-serializer.service';
import { map } from 'rxjs/operators';
import { Banner } from './banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private httpService: HttpService,
    private bannerSerializer: BannerSerializerService,
  ) { }

  getBanners() {
    return this.httpService.request('banners', {}).pipe(map(response => {
      return response.map(data => this.bannerSerializer.getBanner(data));
    }));
  }

  getBanner(id: number) {
    return this.httpService.request(`banners/${id}`, {}).pipe(map(({ data }) => {
      return this.bannerSerializer.getBanner(data);
    }));
  }

  addBanner(params: Banner) {
    return this.httpService.post('banners', { ...params }).pipe(map(({ data }) => {
      return this.bannerSerializer.getBanner(data);
    }));
  }

  updateBanner(id, params) {
    return this.httpService.put(`banners/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.bannerSerializer.getBanner(data);
    }));
  }

  deleteBanner(id: number) {
    return this.httpService.delete(`banners/${id}`).pipe(map(response => {
      return response.map(data => this.bannerSerializer.getBanner(data));
    }));
  }
}
