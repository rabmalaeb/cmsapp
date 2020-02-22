import { Injectable } from '@angular/core';
import { Supplier } from './supplier';
import { CategorySerializerService } from '../category/category-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierSerializerService {

  constructor(
    private categorySerializer: CategorySerializerService
  ) { }

  getSupplier(supplierResponse: any) {
    if (!supplierResponse) {
      return null;
    }
    const supplier = new Supplier();
    supplier.id = parseInt(supplierResponse.id, 0);
    supplier.name = supplierResponse.attributes.name;
    supplier.code = supplierResponse.attributes.code;
    return supplier;
  }
}
