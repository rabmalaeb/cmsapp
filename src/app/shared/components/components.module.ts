import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormLoadingComponent } from './form-loading/form-loading.component';
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
import { CustomPickerComponent } from './custom-picker/custom-picker.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { InputComponent } from './input/input.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { ButtonItemComponent } from './button-item/button-item.component';

@NgModule({
  declarations: [
    AlertComponent,
    ImagePreviewComponent,
    FormLoadingComponent,
    XModalComponent,
    SelectOptionsComponent,
    NavItemComponent,
    PageHeaderComponent,
    FilterControlComponent,
    SearchInputComponent,
    IconComponent,
    CustomPickerComponent,
    CustomSelectComponent,
    InputComponent,
    InputErrorComponent,
    ButtonItemComponent
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
    XModalComponent,
    SelectOptionsComponent,
    NavItemComponent,
    PageHeaderComponent,
    FilterControlComponent,
    IconComponent,
    CustomPickerComponent,
    CustomSelectComponent,
    InputComponent,
    InputErrorComponent,
    SearchInputComponent,
    ButtonItemComponent
  ]
})
export class ComponentsModule {}
