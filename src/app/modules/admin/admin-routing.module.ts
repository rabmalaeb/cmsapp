import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAddComponent } from './admin-add/admin-add.component';


const routes: Routes = [
  { path: 'admins', component: AdminsComponent },
  { path: 'admin/:id', component: AdminComponent },
  { path: 'admins/:id/view', component: AdminAddComponent },
  { path: 'admins/add', component: AdminAddComponent},
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

export class AdminRoutingModule { }
