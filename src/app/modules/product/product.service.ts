import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { ProductSerializerService } from './product-serializer.service';
import { map } from 'rxjs/operators';
import { ProductRequest, Product } from './product';
import { createFormDataFromObject, addPutMethodToFormData } from 'src/app/shared/utils/general';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpService: HttpService,
    private productSerializer: ProductSerializerService
  ) {}

  getProducts(productRequest: ProductRequest) {
    return this.httpService.get('products', productRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.productSerializer.getProduct(item)),
          paginator
        };
      })
    );
  }

  getProduct(id: number) {
    return this.httpService.get(`products/${id}`, {}).pipe(
      map(({ data }) => {
        return this.productSerializer.getProduct(data);
      })
    );
  }

  addProduct(params: Product) {
    const formData = createFormDataFromObject(params);
    return this.httpService.post('products', formData).pipe(
      map(({ data }) => {
        return this.productSerializer.getProduct(data);
      })
    );
  }

  /**
   * post method is used here because LARAVEL doesn't
   *  read PUT requests when sending formdata
   */
  updateProduct(id: number, params: Product) {
    const formData = createFormDataFromObject(params);
    addPutMethodToFormData(formData);
    return this.httpService.post(`products/${id}`, formData).pipe(
      map(({ data }) => {
        return this.productSerializer.getProduct(data);
      })
    );
  }

  deleteProduct(id: number) {
    return this.httpService.delete(`products/${id}`).pipe(
      map(response => {
        return response.map(data => this.productSerializer.getProduct(data));
      })
    );
  }

  getProductFilterLimits() {
    return this.httpService.get('product-filter-limits', {}).pipe(
      map(({ data: { attributes } }) => {
        return this.productSerializer.getProductFilterLimits(attributes);
      })
    );
  }
}
