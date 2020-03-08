import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SupplierStoreEffects } from './effects';
import { supplierReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('supplier', supplierReducer),
    EffectsModule.forFeature([SupplierStoreEffects])
  ],
  providers: [SupplierStoreEffects]
})
export class SupplierStoreModule {}
