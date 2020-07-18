import { Injectable } from '@angular/core';
import { Product, ProductFilterLimits } from './product';
import { CategorySerializerService } from '../category/category-serializer.service';
import { MediaSerializerService } from '../media/media.serializer.service';
import { BrandSerializerService } from '../brand/brand-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSerializerService {
  constructor(
    private categorySerializer: CategorySerializerService,
    private mediaSerializer: MediaSerializerService,
    private brandSerializer: BrandSerializerService
  ) {}

  getProduct(productResponse: any) {
    if (!productResponse) {
      return null;
    }
    const product = new Product();
    product.id = parseInt(productResponse.id, 0);
    product.name = productResponse.attributes.name;
    product.description = productResponse.attributes.description;
    product.categoryId = parseInt(productResponse.attributes.categoryId, 0);
    product.retailPrice = parseInt(productResponse.attributes.retailPrice, 0);
    product.originalPrice = parseInt(
      productResponse.attributes.originalPrice,
      0
    );
    product.quantity = parseInt(productResponse.attributes.quantity, 0);
    product.unitOfCount = productResponse.attributes.unitOfCount;
    product.brandId = parseInt(productResponse.attributes.brand_id, 0);
    product.brand = this.brandSerializer.getBrand(productResponse.relationships.brand);
    product.code = productResponse.attributes.code;
    product.category = this.categorySerializer.getCategory(
      productResponse.relationships.category
    );
    product.media = this.mediaSerializer.getMedia(
      productResponse.relationships.media
    );
    return product;
  }

  getProductFilterLimits(response: any): ProductFilterLimits {
    return {
      maximumOriginalPrice: response.maximumOriginalPrice,
      minimumOriginalPrice: response.minimumOriginalPrice,
      maximumRetailPrice: response.maximumRetailPrice,
      minimumRetailPrice: response.minimumRetailPrice,
    };
  }
}
