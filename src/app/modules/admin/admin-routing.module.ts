import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { ViewAdminGuard } from './guards/view-admin.guard';
import { EditAdminGuard } from './guards/edit-admin.guard';
import { AddAdminGuard } from './guards/add-admin.guard';


const routes: Routes = [
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [ViewAdminGuard]
  },
  { path: 'admin/:id', component: AdminComponent },
  {
    path: 'admins/:id/view',
    component: AdminAddComponent,
    canActivate: [EditAdminGuard]
  },
  {
    path: 'admins/add',
    component: AdminAddComponent,
    canActivate: [AddAdminGuard]
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
export class AdminRoutingModule {}
