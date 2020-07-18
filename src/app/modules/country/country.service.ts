import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

import { map } from 'rxjs/operators';
import { CountrySerializerService } from './country.serializer.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    private httpService: HttpService,
    private countrySerializer: CountrySerializerService
  ) {}

  getCountries() {
    return this.httpService.get('countries', {}).pipe(
      map(({ countries }) => {
        return countries.map(country =>
          this.countrySerializer.getCountry(country)
        );
      })
    );
  }
}
