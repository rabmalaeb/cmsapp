import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LanguageKeyAddComponent } from './languagekey-add/languagekey-add.component';
import { LanguageKeysComponent } from './languagekeys/languagekeys.component';
import { LanguageKeyComponent } from './languagekey/languagekey.component';


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
