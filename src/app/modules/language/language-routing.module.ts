import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageAddComponent } from './language-add/language-add.component';
import { ViewLanguageGuard } from './guards/view-language.guard';
import { EditLanguageGuard } from './guards/edit-language.guard';
import { AddLanguageGuard } from './guards/add-language.guard';

const routes: Routes = [
  {
    path: 'languages',
    component: LanguagesComponent,
    canActivate: [ViewLanguageGuard]
  },
  {
    path: 'languages/:id/view',
    component: LanguageAddComponent,
    canActivate: [EditLanguageGuard]
  },
  {
    path: 'languages/add',
    component: LanguageAddComponent,
    canActivate: [AddLanguageGuard]
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
export class LanguageRoutingModule {}
