import { Category } from '../category/category';
import { Media } from '../media/media';
import Request from 'src/app/shared/request';
import { ImageModel } from 'src/app/shared/models/image';

export class Product extends ImageModel {
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
  minimumRetailPrice?: number;
  maximumRetailPrice?: number;
  minimumOriginalPrice?: number;
  maximumOriginalPrice?: number;
  sortBy?: string;
  sortDirection?: string;
  'categories[]'?: number[];
}

export interface ProductFilterLimits {
  minimumRetailPrice: number;
  maximumRetailPrice: number;
  minimumOriginalPrice: number;
  maximumOriginalPrice: number;
}
