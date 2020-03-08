import { Category } from '../category/category';
import { Media } from '../media/media';
import Request from 'src/app/shared/request';

export class Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  mediaId: number;
  retailPrice: number;
  originalPrice: number;
  unitOfCount: string;
  quantity: number;
  category: Category;
  media: Media;
}

export class ProductRequest extends Request {
  name?: string;
  minimumRetailPrice?: number;
  maximumRetailPrice?: number;
  minimumOriginalPrice?: number;
  maximumOriginalPrice?: number;
  'categories[]'?: number[];
}
