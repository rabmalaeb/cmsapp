import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { SupplierSerializerService } from './supplier-serializer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private httpService: HttpService,
    private supplierSerializer: SupplierSerializerService,
  ) { }

  getSuppliers() {
    return this.httpService.request('suppliers', {}).pipe(map(response => {
      return response.map(data => this.supplierSerializer.getSupplier(data));
    }));
  }

  getSupplier(id: number) {
    return this.httpService.request(`suppliers/${id}`, {}).pipe(map(({ data }) => {
      return this.supplierSerializer.getSupplier(data);
    }));
  }

  addSupplier(params) {
    return this.httpService.post('suppliers', { ...params }).pipe(map(({ data }) => {
      return this.supplierSerializer.getSupplier(data);
    }));
  }

  updateSupplier(id, params) {
    return this.httpService.put(`suppliers/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.supplierSerializer.getSupplier(data);
    }));
  }

  deleteSupplier(id: number) {
    return this.httpService.delete(`suppliers/${id}`).pipe(map(response => {
      return response.map(data => this.supplierSerializer.getSupplier(data));
    }));
  }
}
