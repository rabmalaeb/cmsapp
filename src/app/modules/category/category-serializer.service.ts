import { Injectable } from '@angular/core';
import { Category } from './category';
import { MediaSerializerService } from '../media/media.serializer.service';

@Injectable({
  providedIn: 'root'
})
export class CategorySerializerService {

  constructor(
    private mediaSerializer: MediaSerializerService
  ) { }

  getCategory(categoryResponse: any) {
    if (!categoryResponse) {
      return null;
    }
    const category = new Category();
    category.id = parseInt(categoryResponse.id, 0);
    category.name = categoryResponse.attributes.name;
    category.description = categoryResponse.attributes.description;
    category.parentId = categoryResponse.attributes.parentId;
    category.mediaId = categoryResponse.attributes.mediaId;
    category.media = this.mediaSerializer.getMedia(categoryResponse.relationships.media);
    category.parent = this.getCategory(categoryResponse.relationships.parentCategory);
    return category;
  }
}
