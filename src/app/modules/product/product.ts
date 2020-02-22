import { Category } from '../category/category';
import { Media } from '../media/media';

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
