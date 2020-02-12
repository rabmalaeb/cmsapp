import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LanguageStoreEffects } from './effects';
import { languageReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('language', languageReducer),
    EffectsModule.forFeature([LanguageStoreEffects])
  ],
  providers: [LanguageStoreEffects]
})
export class LanguageStoreModule {}
