import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';
import { ViewUserGuard } from './guards/view-user.guard';
import { EditUserGuard } from './guards/edit-user.guard';
import { AddUserGuard } from './guards/add-user.guard';

const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [ViewUserGuard] },
  { path: 'user/:id', component: UserComponent },
  {
    path: 'users/:id/view',
    component: UserAddComponent,
    canActivate: [EditUserGuard]
  },
  {
    path: 'users/add',
    component: UserAddComponent,
    canActivate: [AddUserGuard]
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
export class UserRoutingModule {}
