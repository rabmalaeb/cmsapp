import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MediaStoreEffects } from './effects';
import { mediaReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('media', mediaReducer),
    EffectsModule.forFeature([MediaStoreEffects])
  ],
  providers: [MediaStoreEffects]
})
export class MediaStoreModule {}
