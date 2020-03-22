import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins/admins.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminFiltersComponent } from './admin-filters/admin-filters.component';

@NgModule({
  declarations: [
    AdminsComponent,
    AdminAddComponent,
    AdminFormComponent,
    AdminFiltersComponent
  ],
  imports: [CommonModule, AdminRoutingModule, ComponentsModule, SharedModule]
})
export class AdminModule {}
