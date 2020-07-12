import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerAddComponent } from './manufacturer-add/manufacturer-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { ManufacturerFiltersComponent } from './manufacturer-filters/manufacturer-filters.component';

@NgModule({
  declarations: [
    ManufacturersComponent,
    ManufacturerAddComponent,
    ManufacturerFormComponent,
    ManufacturerFiltersComponent
  ],
  imports: [CommonModule, ManufacturerRoutingModule, ComponentsModule, SharedModule]
})
export class ManufacturerModule {}
