import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { ViewAdminGuard } from './guards/view-admin.guard';
import { EditAdminGuard } from './guards/edit-admin.guard';
import { AddAdminGuard } from './guards/add-admin.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';


const routes: Routes = [
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [ViewAdminGuard, AuthenticationGuard]
  },
  {
    path: 'admins/:id/view',
    component: AdminAddComponent,
    canActivate: [EditAdminGuard, AuthenticationGuard]
  },
  {
    path: 'admins/add',
    component: AdminAddComponent,
    canActivate: [AddAdminGuard, AuthenticationGuard]
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
export class AdminRoutingModule {}
