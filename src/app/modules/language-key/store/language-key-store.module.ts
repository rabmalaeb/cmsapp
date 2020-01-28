import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { languagekeyReducer } from './reducers';
import { LanguageKeyStoreEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('languagekey', languagekeyReducer),
    EffectsModule.forFeature([LanguageKeyStoreEffects])
  ],
  providers: [LanguageKeyStoreEffects]
})
export class LanguageKeyStoreModule {}
