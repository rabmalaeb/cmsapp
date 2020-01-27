import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RoleStoreEffects } from './effects';
import { roleReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('role', roleReducer),
    EffectsModule.forFeature([RoleStoreEffects])
  ],
  providers: [RoleStoreEffects]
})
export class RoleStoreModule {}
