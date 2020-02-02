import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { ViewPermissionGuard } from './guards/view-permission.guard';
import { EditPermissionGuard } from './guards/edit-permission.guard';
import { AddPermissionGuard } from './guards/add-permission.guard';

const routes: Routes = [
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [ViewPermissionGuard]
  },
  {
    path: 'permissions/:id/view',
    component: PermissionAddComponent,
    canActivate: [EditPermissionGuard]
  },
  {
    path: 'permissions/add',
    component: PermissionAddComponent,
    canActivate: [AddPermissionGuard]
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
export class PermissionRoutingModule {}
