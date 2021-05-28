import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { ViewRoleGuard } from './guards/view-role.guard';
import { EditRoleGuard } from './guards/edit-role.guard';
import { AddRoleGuard } from './guards/add-role.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [ViewRoleGuard, AuthenticationGuard]
  },
  {
    path: 'roles/:id/view',
    component: RoleAddComponent,
    canActivate: [EditRoleGuard, AuthenticationGuard]
  },
  {
    path: 'roles/add',
    component: RoleAddComponent,
    canActivate: [AddRoleGuard, AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
