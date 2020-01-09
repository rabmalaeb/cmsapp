import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepeatPipe } from 'src/app/pipes/repeat.pipe';

@NgModule({
  declarations: [
    RepeatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RepeatPipe
  ]
})
export class PipesModule { }
