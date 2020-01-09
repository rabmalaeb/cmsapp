import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionComponent } from './permission/permission.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';


const routes: Routes = [
  { path: 'permissions', component: PermissionsComponent },
  { path: 'permission/:id', component: PermissionComponent },
  { path: 'permissions/:id/view', component: PermissionAddComponent },
  { path: 'permissions/add', component: PermissionAddComponent},
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

export class PermissionRoutingModule { }
