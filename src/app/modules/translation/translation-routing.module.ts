import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { TranslationsComponent } from './translations/translations.component';
import { TranslationAddComponent } from './translation-add/translation-add.component';
import { ViewTranslationGuard } from './guards/view-translation.guard';
import { EditTranslationGuard } from './guards/edit-translation.guard';
import { AddTranslationGuard } from './guards/add-translation.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'translations',
    component: TranslationsComponent,
    canActivate: [ViewTranslationGuard, AuthenticationGuard]
  },
  {
    path: 'translations/:id/view',
    component: TranslationAddComponent,
    canActivate: [EditTranslationGuard, AuthenticationGuard]
  },
  {
    path: 'translations/add',
    component: TranslationAddComponent,
    canActivate: [AddTranslationGuard, AuthenticationGuard]
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
export class TranslationRoutingModule {}
