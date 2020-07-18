import { Injectable } from '@angular/core';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountrySerializerService {
  constructor() {}

  getCountry(countryResponse: any) {
    if (!countryResponse) {
      return null;
    }
    const country = new Country();
    country.id = countryResponse.id;
    country.name = countryResponse.name;
    country.isoCode = countryResponse.iso_code;
    country.alpha2Code = countryResponse.alpha2_code;
    country.alpha3Code = countryResponse.alpha3_code;
    country.telephoneCode = countryResponse.telephone_code;
    return country;
  }
}
