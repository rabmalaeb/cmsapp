import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleAddComponent } from './role-add/role-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PermissionModule } from '../permissions/permission.module';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleFiltersComponent } from './role-filters/role-filters.component';

@NgModule({
  declarations: [
    RolesComponent,
    RoleAddComponent,
    RoleFormComponent,
    RoleFiltersComponent
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
