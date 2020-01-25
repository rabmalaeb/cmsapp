import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserStoreEffects } from './effects';
import { userReducer } from './reducers';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('myFeature', userReducer),
    EffectsModule.forFeature([UserStoreEffects])
  ],
  providers: [UserStoreEffects]
})
export class UserStoreModule { }
