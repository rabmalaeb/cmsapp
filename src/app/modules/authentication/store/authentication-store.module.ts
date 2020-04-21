import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationReducer } from './reducers';
import { AuthenticationStoreEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('authentication', AuthenticationReducer),
    EffectsModule.forFeature([AuthenticationStoreEffects])
  ],
  providers: [AuthenticationStoreEffects]
})
export class AuthenticationStoreModule {}
