import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionItemComponent } from './permission-item/permission-item.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PermissionGroupComponent } from './permission-group/permission-group.component';
import { PermissionFormComponent } from './permissions-form/permissions-form.component';

@NgModule({
  declarations: [
    PermissionsComponent,
    PermissionItemComponent,
    PermissionAddComponent,
    PermissionGroupComponent,
    PermissionFormComponent
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
