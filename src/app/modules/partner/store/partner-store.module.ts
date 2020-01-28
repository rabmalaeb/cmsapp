import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PartnerStoreEffects } from './effects';
import { partnerReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('partner', partnerReducer),
    EffectsModule.forFeature([PartnerStoreEffects])
  ],
  providers: [PartnerStoreEffects]
})
export class PartnerStoreModule {}
