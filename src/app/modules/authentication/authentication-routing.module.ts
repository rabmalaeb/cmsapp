import { NgModule } from '@angular/core';
import { Routes, PreloadAllModules, RouterModule } from '@angular/router';
import { AuthenticationBoxComponent } from './authentication-box/authentication-box.component';
import { LoggedInGuard } from 'src/app/core/guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationBoxComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'recover/password/:token',
    component: AuthenticationBoxComponent,
    canActivate: [LoggedInGuard]
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
export class AuthenticationRoutingModule {}
