import { Injectable } from '@angular/core';
import { Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandSerializerService {

  constructor() { }

  getBrand(brandResponse: any) {
    if (!brandResponse) {
      return null;
    }
    const brand = new Brand();
    brand.id = parseInt(brandResponse.id, 0);
    brand.name = brandResponse.attributes.name;
    brand.code = brandResponse.attributes.code;
    return brand;
  }
}
