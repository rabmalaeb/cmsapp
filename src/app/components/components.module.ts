import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { AlertComponent } from './alert/alert.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SharedModule } from 'src/app/shared.module';
import { FormLoadingComponent } from './form-loading/form-loading.component';
import { InputItemComponent } from './input-item/input-item.component';

@NgModule({
  declarations: [
    AlertComponent,
    ImagePreviewComponent,
    FormLoadingComponent,
    InputItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    AlertComponent,
    ImagePreviewComponent,
    FormLoadingComponent,
    InputItemComponent
  ]
})
export class ComponentsModule { }
