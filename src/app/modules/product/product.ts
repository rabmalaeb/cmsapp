import { Category } from '../category/category';
import { Media } from '../media/media';

export class Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  mediaId: number;
  category: Category;
  media: Media;
}
