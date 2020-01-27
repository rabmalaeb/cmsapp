import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PermissionStoreEffects } from './effects';
import { permissionReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('permission', permissionReducer),
    EffectsModule.forFeature([PermissionStoreEffects])
  ],
  providers: [PermissionStoreEffects]
})
export class PermissionStoreModule {}
