import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierFiltersComponent } from './supplier-filters/supplier-filters.component';

@NgModule({
  declarations: [SuppliersComponent, SupplierAddComponent, SupplierFormComponent, SupplierFiltersComponent],
  imports: [CommonModule, SupplierRoutingModule, ComponentsModule, SharedModule]
})
export class SupplierModule {}
