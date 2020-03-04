import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { ProductSerializerService } from './product-serializer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpService: HttpService,
    private productSerializer: ProductSerializerService,
  ) { }

  getProducts() {
    return this.httpService.request('products', {}).pipe(map(response => {
      return response.map(data => this.productSerializer.getProduct(data));
    }));
  }

  getProduct(id: number) {
    return this.httpService.request(`products/${id}`, {}).pipe(map(({ data }) => {
      return this.productSerializer.getProduct(data);
    }));
  }

  addProduct(params) {
    return this.httpService.post('products', { ...params }).pipe(map(({ data }) => {
      return this.productSerializer.getProduct(data);
    }));
  }

  updateProduct(id, params) {
    return this.httpService.put(`products/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.productSerializer.getProduct(data);
    }));
  }

  deleteProduct(id: number) {
    return this.httpService.delete(`products/${id}`).pipe(map(response => {
      return response.map(data => this.productSerializer.getProduct(data));
    }));
  }
}
