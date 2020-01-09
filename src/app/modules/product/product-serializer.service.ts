import { Injectable } from '@angular/core';
import { Product } from './product';
import { CategorySerializerService } from '../category/category-serializer.service';
import { MediaSerializerService } from '../media/media.serializer.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSerializerService {

  constructor(
    private categorySerializer: CategorySerializerService,
    private mediaSerializer: MediaSerializerService
  ) { }

  getProduct(productResponse: any) {
    if (!productResponse) {
      return null;
    }
    const product = new Product();
    product.id = parseInt(productResponse.id, 0);
    product.name = productResponse.attributes.name;
    product.description = productResponse.attributes.description;
    product.categoryId = productResponse.attributes.categoryId;
    product.category = this.categorySerializer.getCategory(productResponse.relationships.category);
    product.media = this.mediaSerializer.getMedia(productResponse.relationships.media);
    return product;
  }
}
