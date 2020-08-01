import FilterRequest from 'src/app/shared/request';
import { Country } from '../country/country';

export class Manufacturer {
  id: number;
  name: string;
  code: string;
  countryId: number;
  country?: Country;
}
export class ManufacturerRequest extends FilterRequest {}
