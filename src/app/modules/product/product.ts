import { Category } from '../category/category';
import { Media } from '../media/media';
import { ImageModel } from 'src/app/shared/models/image';
import FilterRequest from 'src/app/shared/request';

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
  brand: string;
  manufacturer: string;
  country: string;
  code: string;
  category: Category;
  media: Media;
}

export class ProductRequest extends FilterRequest
  implements Partial<ProductFilterLimits> {
  minimumRetailPrice?: number;
  maximumRetailPrice?: number;
  minimumOriginalPrice?: number;
  maximumOriginalPrice?: number;
  'categories[]'?: number[];
}

export interface ProductFilterLimits {
  minimumRetailPrice: number;
  maximumRetailPrice: number;
  minimumOriginalPrice: number;
  maximumOriginalPrice: number;
}
