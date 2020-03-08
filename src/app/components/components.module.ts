import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormLoadingComponent } from './form-loading/form-loading.component';
import { InputItemComponent } from './input-item/input-item.component';
import { XModalComponent } from './x-modal/x-modal.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { SelectOptionsComponent } from './select-options/select-options.component';

@NgModule({
  declarations: [
    AlertComponent,
    ImagePreviewComponent,
    FormLoadingComponent,
    InputItemComponent,
    XModalComponent,
    SelectOptionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    AlertComponent,
    ImagePreviewComponent,
    FormLoadingComponent,
    InputItemComponent,
    XModalComponent,
    SelectOptionsComponent,
  ]
})
export class ComponentsModule { }
