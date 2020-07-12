import FilterRequest from 'src/app/shared/request';

export class Brand {
  id: number;
  name: string;
  code: string;
}
export class BrandRequest extends FilterRequest {}
