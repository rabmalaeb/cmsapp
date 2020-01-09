import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'users/:id/view', component: UserAddComponent },
  { path: 'users/add', component: UserAddComponent},
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

export class UserRoutingModule { }
