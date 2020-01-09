import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { AlertComponent } from './alert/alert.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    AlertComponent,
    ImagePreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    AlertComponent,
    ImagePreviewComponent
  ]
})
export class ComponentsModule { }
