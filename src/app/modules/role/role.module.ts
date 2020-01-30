import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { RoleItemComponent } from './role-item/role-item.component';
import { RoleComponent } from './role/role.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleAddComponent } from './role-add/role-add.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PermissionModule } from '../permissions/permission.module';

@NgModule({
  declarations: [
    RolesComponent,
    RoleItemComponent,
    RoleComponent,
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
