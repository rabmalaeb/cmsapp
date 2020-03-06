import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { CategorySerializerService } from './category-serializer.service';
import { map } from 'rxjs/operators';
import { CategoryRequest } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpService: HttpService,
    private categorySerializer: CategorySerializerService,
  ) { }

  getCategories(categoryRequest: CategoryRequest) {
    return this.httpService.request('categories', categoryRequest).pipe(map(response => {
      return response.map(data => this.categorySerializer.getCategory(data));
    }));
  }

  getCategory(id: number) {
    return this.httpService.request(`categories/${id}`, {}).pipe(map(({ data }) => {
      return this.categorySerializer.getCategory(data);
    }));
  }

  addCategory(params) {
    return this.httpService.post('categories', { ...params }).pipe(map(({ data }) => {
      return this.categorySerializer.getCategory(data);
    }));
  }

  updateCategory(id, params) {
    return this.httpService.put(`categories/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.categorySerializer.getCategory(data);
    }));
  }

  deleteCategory(id: number) {
    return this.httpService.delete(`categories/${id}`).pipe(map(response => {
      return response.map(data => this.categorySerializer.getCategory(data));
    }));
  }
}
