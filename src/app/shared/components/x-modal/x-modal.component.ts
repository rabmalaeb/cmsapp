import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalOptions } from './modal';

@Component({
  selector: 'app-x-modal',
  templateUrl: './x-modal.component.html',
  styleUrls: ['./x-modal.component.scss']
})
export class XModalComponent implements OnInit {
  /**
   * this is set when the x-modal is being called
   * to specify the css class to be added if any
   */
  @Input() type: string;

  /**
   * event emiter to be sent when the close action is performed
   */
  @Output() closeModal = new EventEmitter();

  @Input() options: ModalOptions = null;

  constructor() {}

  ngOnInit() {}

  /**
   *
   */
  get title() {
    return this.options ? this.options.title : '';
  }

  get showHeader() {
    return this.options ? this.options.showHeader : false;
  }

  get isFilterControl() {
    return this.type === 'filter-control';
  }

  /**
   * emit the close event when the X is clicked
   * the component which initiated the x-modal is responsible for closing it
   */
  close() {
    this.closeModal.emit();
  }
}
