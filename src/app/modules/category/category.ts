import { Media } from '../media/media';
import Request from 'src/app/shared/request';

export class Category {
  id: number;
  name: string;
  description: string;
  parentId: number;
  parent: Category;
  mediaId: number;
  media: Media;
}
export class CategoryRequest extends Request {
  name?: string;
}
