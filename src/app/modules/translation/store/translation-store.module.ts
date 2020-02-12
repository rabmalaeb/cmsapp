import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslationStoreEffects } from './effects';
import { translationReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('translation', translationReducer),
    EffectsModule.forFeature([TranslationStoreEffects])
  ],
  providers: [TranslationStoreEffects]
})
export class TranslationStoreModule {}
