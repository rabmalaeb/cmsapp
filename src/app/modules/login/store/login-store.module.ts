import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './reducers';
import { LoginStoreEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('Login', LoginReducer),
    EffectsModule.forFeature([LoginStoreEffects])
  ],
  providers: [LoginStoreEffects]
})
export class LoginStoreModule {}
