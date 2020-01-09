import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';
import { RoleAddComponent } from './role-add/role-add.component';


const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: 'role/:id', component: RoleComponent },
  { path: 'roles/:id/view', component: RoleAddComponent },
  { path: 'roles/add', component: RoleAddComponent},
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

export class RoleRoutingModule { }
