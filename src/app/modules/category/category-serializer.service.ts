import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategorySerializerService {

  constructor() { }

  getCategory(categoryResponse: any) {
    if (!categoryResponse) {
      return null;
    }
    const category = new Category();
    category.id = parseInt(categoryResponse.id, 0);
    category.name = categoryResponse.attributes.name;
    category.description = categoryResponse.attributes.description;
    category.parentId = categoryResponse.attributes.parentId;
    category.parent = this.getCategory(categoryResponse.relationships.parentCategory);
    console.log('cate ', category);
    return category;
  }
}
