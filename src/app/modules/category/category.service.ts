import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { CategorySerializerService } from './category-serializer.service';
import { map } from 'rxjs/operators';
import { CategoryRequest, Category } from './category';
import { createFormDataFromObject, addPutMethodToFormData } from 'src/app/shared/utils/general';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private httpService: HttpService,
    private categorySerializer: CategorySerializerService
  ) {}

  getCategories(categoryRequest: CategoryRequest) {
    return this.httpService.get('categories', categoryRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.categorySerializer.getCategory(item)),
          paginator
        };
      })
    );
  }

  getCategory(id: number) {
    return this.httpService.get(`categories/${id}`, {}).pipe(
      map(({ data }) => {
        return this.categorySerializer.getCategory(data);
      })
    );
  }

  addCategory(params: Category) {
    const formData = createFormDataFromObject(params);
    return this.httpService.post('categories', formData).pipe(
      map(({ data }) => {
        return this.categorySerializer.getCategory(data);
      })
    );
  }

  /**
   * post method is used here because LARAVEL doesn't
   *  read PUT requests when sending formdata
   */
  updateCategory(id: number, params: Category) {
    const formData = createFormDataFromObject(params);
    addPutMethodToFormData(formData);
    return this.httpService.post(`categories/${id}`, formData).pipe(
      map(({ data }) => {
        return this.categorySerializer.getCategory(data);
      })
    );
  }

  deleteCategory(id: number) {
    return this.httpService.delete(`categories/${id}`).pipe(
      map(response => {
        return response.map(data => this.categorySerializer.getCategory(data));
      })
    );
  }
}
