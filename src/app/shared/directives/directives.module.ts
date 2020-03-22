import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseComponentDirective } from './close-component.directive';

@NgModule({
  declarations: [
    CloseComponentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CloseComponentDirective
  ]
})
export class DirectivesModule { }
