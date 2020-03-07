import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';

@NgModule({
  declarations: [ProductsComponent, ProductAddComponent, ProductFormComponent, ProductFiltersComponent],
  imports: [CommonModule, ProductRoutingModule, ComponentsModule, SharedModule]
})
export class ProductModule {}
