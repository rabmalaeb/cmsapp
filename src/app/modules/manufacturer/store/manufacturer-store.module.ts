import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ManufacturerStoreEffects } from './effects';
import { manufacturerReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('manufacturer', manufacturerReducer),
    EffectsModule.forFeature([ManufacturerStoreEffects])
  ],
  providers: [ManufacturerStoreEffects]
})
export class ManufacturerStoreModule {}
