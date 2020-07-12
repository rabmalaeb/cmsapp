import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { BrandSerializerService } from './brand-serializer.service';
import { map } from 'rxjs/operators';
import { BrandRequest, Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(
    private httpService: HttpService,
    private brandSerializer: BrandSerializerService
  ) {}

  getBrands(brandRequest: BrandRequest) {
    return this.httpService.get('brands', brandRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.brandSerializer.getBrand(item)),
          paginator
        };
      })
    );
  }

  getBrand(id: number) {
    return this.httpService.get(`brands/${id}`, {}).pipe(
      map(({ data }) => {
        return this.brandSerializer.getBrand(data);
      })
    );
  }

  addBrand(params: Brand) {
    return this.httpService.post('brands', { ...params }).pipe(
      map(({ data }) => {
        return this.brandSerializer.getBrand(data);
      })
    );
  }

  updateBrand(id: number, params: Brand) {
    return this.httpService.put(`brands/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.brandSerializer.getBrand(data);
      })
    );
  }

  deleteBrand(id: number) {
    return this.httpService.delete(`brands/${id}`).pipe(
      map(response => {
        return response.map(data => this.brandSerializer.getBrand(data));
      })
    );
  }
}
