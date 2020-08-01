import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseComponentDirective } from './close-component.directive';
import { MouseDownDirective } from './mouse-down.directive';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    CloseComponentDirective,
    MouseDownDirective,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CloseComponentDirective,
    MouseDownDirective,
    ClickOutsideDirective
  ]
})
export class DirectivesModule { }
