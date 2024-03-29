import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionItemComponent } from './permission-item/permission-item.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PermissionGroupComponent } from './permission-group/permission-group.component';
import { PermissionFormComponent } from './permissions-form/permissions-form.component';
import { PermissionFiltersComponent } from './permission-filters/permission-filters.component';

@NgModule({
  declarations: [
    PermissionsComponent,
    PermissionItemComponent,
    PermissionAddComponent,
    PermissionGroupComponent,
    PermissionFormComponent,
    PermissionFiltersComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  exports: [PermissionGroupComponent]
})
export class PermissionModule {}
