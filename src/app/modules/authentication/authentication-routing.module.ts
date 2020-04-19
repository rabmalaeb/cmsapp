import { NgModule } from '@angular/core';
import { Routes, PreloadAllModules, RouterModule } from '@angular/router';
import { AuthenticationBoxComponent } from './authentication-box/authentication-box.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationBoxComponent },
  { path: 'recover/password/:token', component: AuthenticationBoxComponent },
];

@NgModule({
  imports: [
    RouterModule
    .forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
