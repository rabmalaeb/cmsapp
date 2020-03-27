import { Media } from '../media/media';
import Request from 'src/app/shared/request';
import { ImageModel } from 'src/app/shared/models';

export class Category extends ImageModel {
  id: number;
  name: string;
  description: string;
  parentId: number;
  parent: Category;
  mediaId: number;
  media: Media;
}
export class CategoryRequest extends Request {}
