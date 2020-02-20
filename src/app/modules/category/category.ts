import { Media } from '../media/media';

export class Category {
  id: number;
  name: string;
  description: string;
  parentId: number;
  parent: Category;
  mediaId: number;
  media: Media;
}
