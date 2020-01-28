import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductStoreEffects } from './effects';
import { productReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('product', productReducer),
    EffectsModule.forFeature([ProductStoreEffects])
  ],
  providers: [ProductStoreEffects]
})
export class ProductStoreModule {}
