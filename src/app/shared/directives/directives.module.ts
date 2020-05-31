import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseComponentDirective } from './close-component.directive';
import { MouseDownDirective } from './mouse-down.directive';

@NgModule({
  declarations: [
    CloseComponentDirective,
    MouseDownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CloseComponentDirective,
    MouseDownDirective
  ]
})
export class DirectivesModule { }
