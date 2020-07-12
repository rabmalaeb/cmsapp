import FilterRequest from 'src/app/shared/request';

export class Manufacturer {
  id: number;
  name: string;
  code: string;
}
export class ManufacturerRequest extends FilterRequest {}
