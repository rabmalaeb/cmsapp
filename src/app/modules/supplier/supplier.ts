import { Category } from '../category/category';
import Request from 'src/app/shared/request';

export class Supplier {
  id: number;
  name: string;
  code: string;
}

export class SupplierRequest extends Request {}
