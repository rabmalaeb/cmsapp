import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleAddComponent } from './role-add/role-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PermissionModule } from '../permissions/permission.module';

@NgModule({
  declarations: [
    RolesComponent,
    RoleAddComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    PermissionModule,
    ComponentsModule,
    SharedModule
  ]
})
export class RoleModule {}
