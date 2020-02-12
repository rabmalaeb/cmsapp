import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { ViewRoleGuard } from './guards/view-role.guard';
import { EditRoleGuard } from './guards/edit-role.guard';
import { AddRoleGuard } from './guards/add-role.guard';

const routes: Routes = [
  { path: 'roles', component: RolesComponent, canActivate: [ViewRoleGuard] },
  {
    path: 'roles/:id/view',
    component: RoleAddComponent,
    canActivate: [EditRoleGuard]
  },
  {
    path: 'roles/add',
    component: RoleAddComponent,
    canActivate: [AddRoleGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
