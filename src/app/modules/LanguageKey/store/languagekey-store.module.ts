import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LanguagekeyStoreEffects } from './effects';
import { languagekeyReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('languagekey', languagekeyReducer),
    EffectsModule.forFeature([LanguagekeyStoreEffects])
  ],
  providers: [LanguagekeyStoreEffects]
})
export class LanguagekeyStoreModule {}
