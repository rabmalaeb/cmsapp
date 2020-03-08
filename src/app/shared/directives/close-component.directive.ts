import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCloseComponent]'
})
export class CloseComponentDirective {
  constructor() {}

  @Output() escapeClicked: EventEmitter<any> = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('event ', event);

    if (event.code === 'Escape') {
      this.escapeClicked.emit();
    }
  }
}
