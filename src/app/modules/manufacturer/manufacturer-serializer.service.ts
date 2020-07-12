import { Injectable } from '@angular/core';
import { Manufacturer } from './manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerSerializerService {

  constructor() { }

  getManufacturer(languageResponse: any) {
    if (!languageResponse) {
      return null;
    }
    const manufacturer = new Manufacturer();
    manufacturer.id = parseInt(languageResponse.id, 0);
    manufacturer.name = languageResponse.attributes.name;
    manufacturer.code = languageResponse.attributes.code;
    return manufacturer;
  }
}
