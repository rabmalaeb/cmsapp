import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LanguageKeyAddComponent } from './language-key-add/language-key-add.component';
import { LanguageKeysComponent } from './language-keys/language-keys.component';
import { AddLanguageKeyGuard } from './guards/add-languagekey.guard';
import { ViewLanguageKeyGuard } from './guards/view-languagekey.guard';
import { EditLanguageKeyGuard } from './guards/edit-languagekey.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'keys',
    component: LanguageKeysComponent,
    canActivate: [ViewLanguageKeyGuard, AuthenticationGuard]
  },
  {
    path: 'keys/:id/view',
    component: LanguageKeyAddComponent,
    canActivate: [EditLanguageKeyGuard, AuthenticationGuard]
  },
  {
    path: 'keys/add',
    component: LanguageKeyAddComponent,
    canActivate: [AddLanguageKeyGuard, AuthenticationGuard]
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
export class LanguageKeyRoutingModule {}
