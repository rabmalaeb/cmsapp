import { Media } from '../media/media';
import FilterRequest from 'src/app/shared/request';
import { ImageModel } from 'src/app/shared/models/image';

export class Category extends ImageModel {
  id: number;
  name: string;
  description: string;
  parentId: number;
  parent: Category;
  mediaId: number;
  media: Media;
}
export class CategoryRequest extends FilterRequest {}
