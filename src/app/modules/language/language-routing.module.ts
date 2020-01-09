import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageComponent } from './language/language.component';
import { LanguageAddComponent } from './language-add/language-add.component';


const routes: Routes = [
  { path: 'languages', component: LanguagesComponent },
  { path: 'language/:id', component: LanguageComponent },
  { path: 'languages/:id/view', component: LanguageAddComponent },
  { path: 'languages/add', component: LanguageAddComponent},
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

export class LanguageRoutingModule { }
