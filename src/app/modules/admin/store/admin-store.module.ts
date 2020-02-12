import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdminStoreEffects } from './effects';
import { adminReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([AdminStoreEffects])
  ],
  providers: [AdminStoreEffects]
})
export class AdminStoreModule {}
