import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { ManufacturerSerializerService } from './manufacturer-serializer.service';
import { map } from 'rxjs/operators';
import { ManufacturerRequest, Manufacturer } from './manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  constructor(
    private httpService: HttpService,
    private languageSerializer: ManufacturerSerializerService
  ) {}

  getManufacturers(languageRequest: ManufacturerRequest) {
    return this.httpService.get('manufacturers', languageRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.languageSerializer.getManufacturer(item)),
          paginator
        };
      })
    );
  }

  getManufacturer(id: number) {
    return this.httpService.get(`manufacturers/${id}`, {}).pipe(
      map(({ data }) => {
        return this.languageSerializer.getManufacturer(data);
      })
    );
  }

  addManufacturer(params: Manufacturer) {
    return this.httpService.post('manufacturers', { ...params }).pipe(
      map(({ data }) => {
        return this.languageSerializer.getManufacturer(data);
      })
    );
  }

  updateManufacturer(id: number, params: Manufacturer) {
    return this.httpService.put(`manufacturers/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.languageSerializer.getManufacturer(data);
      })
    );
  }

  deleteManufacturer(id: number) {
    return this.httpService.delete(`manufacturers/${id}`).pipe(
      map(response => {
        return response.map(data => this.languageSerializer.getManufacturer(data));
      })
    );
  }
}
