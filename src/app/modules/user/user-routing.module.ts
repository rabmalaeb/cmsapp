import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';
import { ViewUserGuard } from './guards/view-user.guard';
import { EditUserGuard } from './guards/edit-user.guard';
import { AddUserGuard } from './guards/add-user.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ViewUserGuard, AuthenticationGuard]
  },
  {
    path: 'users/:id/view',
    component: UserAddComponent,
    canActivate: [EditUserGuard, AuthenticationGuard]
  },
  {
    path: 'users/add',
    component: UserAddComponent,
    canActivate: [AddUserGuard, AuthenticationGuard]
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
export class UserRoutingModule {}
