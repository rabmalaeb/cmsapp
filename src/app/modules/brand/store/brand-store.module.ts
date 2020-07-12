import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrandStoreEffects } from './effects';
import { brandReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('brand', brandReducer),
    EffectsModule.forFeature([BrandStoreEffects])
  ],
  providers: [BrandStoreEffects]
})
export class BrandStoreModule {}
