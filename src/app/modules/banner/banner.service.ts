import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { BannerSerializerService } from './banner-serializer.service';
import { map } from 'rxjs/operators';
import { Banner, BannerRequest } from './banner';
import { createFormDataFromObject, addPutMethodToFormData } from 'src/app/shared/utils/general';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(
    private httpService: HttpService,
    private bannerSerializer: BannerSerializerService
  ) {}

  getBanners(bannerRequest: BannerRequest) {
    return this.httpService.get('banners', bannerRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.bannerSerializer.getBanner(item)),
          paginator
        };
      })
    );
  }

  getBanner(id: number) {
    return this.httpService.get(`banners/${id}`, {}).pipe(
      map(({ data }) => {
        return this.bannerSerializer.getBanner(data);
      })
    );
  }

  addBanner(params: Banner) {
    const formData = createFormDataFromObject(params);
    return this.httpService.post('banners', formData).pipe(
      map(({ data }) => {
        return this.bannerSerializer.getBanner(data);
      })
    );
  }

  updateBanner(id: number, params: Banner) {
    const formData = createFormDataFromObject(params);
    addPutMethodToFormData(formData);
    return this.httpService.post(`banners/${id}`, formData).pipe(
      map(({ data }) => {
        return this.bannerSerializer.getBanner(data);
      })
    );
  }

  deleteBanner(id: number) {
    return this.httpService.delete(`banners/${id}`).pipe(
      map(response => {
        return response.map(data => this.bannerSerializer.getBanner(data));
      })
    );
  }
}
