import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LanguageKeyAddComponent } from './LanguageKey-add/LanguageKey-add.component';
import { LanguageKeysComponent } from './languageKeys/languageKeys.component';
import { LanguageKeyComponent } from './LanguageKey/LanguageKey.component';


const routes: Routes = [
  { path: 'keys', component: LanguageKeysComponent },
  { path: 'key/:id', component: LanguageKeyComponent },
  { path: 'keys/:id/view', component: LanguageKeyAddComponent },
  { path: 'keys/add', component: LanguageKeyAddComponent},
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

export class LanguageKeyRoutingModule { }
