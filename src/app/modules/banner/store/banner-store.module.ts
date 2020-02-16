import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BannerStoreEffects } from './effects';
import { bannerReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('banner', bannerReducer),
    EffectsModule.forFeature([BannerStoreEffects])
  ],
  providers: [BannerStoreEffects]
})
export class BannerStoreModule {}
