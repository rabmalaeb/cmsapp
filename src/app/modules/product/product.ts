import { Category } from '../category/category';
import { Media } from '../media/media';
import { ImageModel } from 'src/app/shared/models/image';
import FilterRequest from 'src/app/shared/request';
import { Brand } from '../brand/brand';

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
  brandId: number;
  code: string;
  category: Category;
  media: Media;
  brand: Brand;
}

export class ProductRequest extends FilterRequest
  implements Partial<ProductFilterLimits> {
  minimumRetailPrice?: number;
  maximumRetailPrice?: number;
  minimumOriginalPrice?: number;
  maximumOriginalPrice?: number;
  'categories[]'?: number[];
  'brands[]'?: number[];
  'manufacturers[]'?: number[];
}

export interface ProductFilterLimits {
  minimumRetailPrice: number;
  maximumRetailPrice: number;
  minimumOriginalPrice: number;
  maximumOriginalPrice: number;
}
