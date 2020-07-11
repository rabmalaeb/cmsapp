import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMouseDown]'
})
export class MouseDownDirective {
  element: HTMLInputElement;
  constructor(private elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  handleMouseDownEvent(event: MouseEvent) {
    this.addButtonClickedClass();
  }

  @HostListener('mouseup', ['$event'])
  handleMouseUpEvent(event: MouseEvent) {
    this.removeButtonClickedClass();
  }

  @HostListener('mouseout', ['$event'])
  handleMouseOutEvent(event: MouseEvent) {
    this.removeButtonClickedClass();
  }

  addButtonClickedClass() {
    this.element.classList.add('action_is-clicked');
  }

  removeButtonClickedClass() {
    if (this.element.classList.contains('action_is-clicked')) {
      this.element.classList.remove('action_is-clicked');
    }
  }
}
