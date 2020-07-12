import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ManufacturerStoreEffects } from './effects';
import { languageReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('manufacturer', languageReducer),
    EffectsModule.forFeature([ManufacturerStoreEffects])
  ],
  providers: [ManufacturerStoreEffects]
})
export class ManufacturerStoreModule {}
