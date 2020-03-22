import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { SupplierSerializerService } from './supplier-serializer.service';
import { map } from 'rxjs/operators';
import { SupplierRequest, Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(
    private httpService: HttpService,
    private supplierSerializer: SupplierSerializerService
  ) {}

  getSuppliers(supplierRequest: SupplierRequest) {
    return this.httpService.request('suppliers', supplierRequest).pipe(
      map(({ data }) => {
        if (data) {
          return {
            items: data.items.map(item =>
              this.supplierSerializer.getSupplier(item)
            ),
            paginator: data.paginator
          };
        }
      })
    );
  }

  getSupplier(id: number) {
    return this.httpService.request(`suppliers/${id}`, {}).pipe(
      map(({ data }) => {
        return this.supplierSerializer.getSupplier(data);
      })
    );
  }

  addSupplier(params: Supplier) {
    return this.httpService.post('suppliers', { ...params }).pipe(
      map(({ data }) => {
        return this.supplierSerializer.getSupplier(data);
      })
    );
  }

  updateSupplier(id: number, params: Supplier) {
    return this.httpService.put(`suppliers/${id}`, { ...params }).pipe(
      map(({ data }) => {
        return this.supplierSerializer.getSupplier(data);
      })
    );
  }

  deleteSupplier(id: number) {
    return this.httpService.delete(`suppliers/${id}`).pipe(
      map(response => {
        return response.map(data => this.supplierSerializer.getSupplier(data));
      })
    );
  }
}
