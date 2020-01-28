import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LanguageKeyAddComponent } from './language-key-add/language-key-add.component';
import { LanguageKeysComponent } from './language-keys/language-keys.component';
import { LanguageKeyComponent } from './language-key/language-key.component';
import { AddLanguageKeyGuard } from './guards/add-languagekey.guard';
import { ViewLanguageKeyGuard } from './guards/view-languagekey.guard';
import { EditLanguageKeyGuard } from './guards/edit-languagekey.guard';

const routes: Routes = [
  {
    path: 'keys',
    component: LanguageKeysComponent,
    canActivate: [ViewLanguageKeyGuard]
  },
  { path: 'key/:id', component: LanguageKeyComponent },
  {
    path: 'keys/:id/view',
    component: LanguageKeyAddComponent,
    canActivate: [EditLanguageKeyGuard]
  },
  {
    path: 'keys/add',
    component: LanguageKeyAddComponent,
    canActivate: [AddLanguageKeyGuard]
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
