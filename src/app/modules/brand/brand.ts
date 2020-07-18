import FilterRequest from 'src/app/shared/request';
import { Manufacturer } from '../manufacturer/manufacturer';

export class Brand {
  id: number;
  name: string;
  manufacturerId: number;
  manufacturer?: Manufacturer;
}
export class BrandRequest extends FilterRequest {}
