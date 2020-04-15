import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, PreloadAllModules, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
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
export class LoginRoutingModule { }
