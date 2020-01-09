import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionItemComponent } from './permission-item/permission-item.component';
import { PermissionComponent } from './permission/permission.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PermissionGroupComponent } from './permission-group/permission-group.component';

@NgModule({
  declarations: [PermissionsComponent, PermissionItemComponent, PermissionComponent, PermissionAddComponent, PermissionGroupComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    ComponentsModule,
    SharedModule
  ],
   exports: [
    PermissionGroupComponent
  ]
})
export class PermissionModule { }
