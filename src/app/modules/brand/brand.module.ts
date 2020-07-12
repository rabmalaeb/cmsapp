import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { BrandFiltersComponent } from './brand-filters/brand-filters.component';

@NgModule({
  declarations: [
    BrandsComponent,
    BrandAddComponent,
    BrandFormComponent,
    BrandFiltersComponent
  ],
  imports: [CommonModule, BrandRoutingModule, ComponentsModule, SharedModule]
})
export class BrandModule {}
