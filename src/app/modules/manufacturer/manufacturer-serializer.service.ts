import { Injectable } from '@angular/core';
import { Manufacturer } from './manufacturer';
import { CountrySerializerService } from '../country/country.serializer.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerSerializerService {
  constructor(private countrySerializer: CountrySerializerService) {}

  getManufacturer(manufacturerResponse: any) {
    if (!manufacturerResponse) {
      return null;
    }
    const manufacturer = new Manufacturer();
    manufacturer.id = parseInt(manufacturerResponse.id, 0);
    manufacturer.name = manufacturerResponse.attributes.name;
    (manufacturer.country = this.countrySerializer.getCountry(
      manufacturerResponse.relationships.country
    )),
      (manufacturer.countryId = parseInt(
        manufacturerResponse.attributes.country_id,
        0
      ));
    return manufacturer;
  }
}
