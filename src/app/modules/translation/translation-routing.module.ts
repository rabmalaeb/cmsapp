import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { TranslationsComponent } from './Translations/translations.component';
import { TranslationComponent } from './translation/translation.component';
import { TranslationAddComponent } from './translation-add/translation-add.component';


const routes: Routes = [
  { path: 'translations', component: TranslationsComponent },
  { path: 'translation/:id', component: TranslationComponent },
  { path: 'translations/:id/view', component: TranslationAddComponent },
  { path: 'translations/add', component: TranslationAddComponent},
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

export class TranslationRoutingModule { }
