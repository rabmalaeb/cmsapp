import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormLoadingComponent } from './form-loading/form-loading.component';
import { InputItemComponent } from './input-item/input-item.component';
import { XModalComponent } from './x-modal/x-modal.component';
import { SelectOptionsComponent } from './select-options/select-options.component';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
import { NavItemComponent } from './nav-item/nav-item.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RouterModule } from '@angular/router';
import { FilterControlComponent } from './filter-control/filter-control.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  declarations: [
    AlertComponent,
    ImagePreviewComponent,
    FormLoadingComponent,
    InputItemComponent,
    XModalComponent,
    SelectOptionsComponent,
    NavItemComponent,
    PageHeaderComponent,
    FilterControlComponent,
    SearchInputComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [
    AlertComponent,
    ImagePreviewComponent,
    FormLoadingComponent,
    InputItemComponent,
    XModalComponent,
    SelectOptionsComponent,
    NavItemComponent,
    PageHeaderComponent,
    FilterControlComponent,
    IconComponent,
    SearchInputComponent,
  ]
})
export class ComponentsModule {}
