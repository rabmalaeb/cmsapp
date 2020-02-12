import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryStoreEffects } from './effects';
import { categoryReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('category', categoryReducer),
    EffectsModule.forFeature([CategoryStoreEffects])
  ],
  providers: [CategoryStoreEffects]
})
export class CategoryStoreModule {}
