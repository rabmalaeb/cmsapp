import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CountryStoreEffects } from './effects';
import { countryReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('country', countryReducer),
    EffectsModule.forFeature([CountryStoreEffects])
  ],
  providers: [CountryStoreEffects]
})
export class CountryStoreModule {}
