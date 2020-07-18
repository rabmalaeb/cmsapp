import { Injectable } from '@angular/core';
import { Brand } from './brand';
import { ManufacturerSerializerService } from '../manufacturer/manufacturer-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class BrandSerializerService {

  constructor(
    private manufacturerService: ManufacturerSerializerService
  ) { }

  getBrand(brandResponse: any) {
    if (!brandResponse) {
      return null;
    }
    const brand = new Brand();
    brand.id = parseInt(brandResponse.id, 0);
    brand.name = brandResponse.attributes.name;
    brand.manufacturerId = brandResponse.attributes.manufacturer_id;
    brand.manufacturer = this.manufacturerService.getManufacturer(brandResponse.relationships.manufacturer);
    return brand;
  }
}
