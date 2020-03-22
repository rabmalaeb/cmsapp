import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  @Input() label: string;
  @Input() link: string;
  @Input() buttonLabel: string;
  @Input() condition = true;
  @Output() action = new EventEmitter<any>();

  ngOnInit() {
  }

  sendAction() {
    this.action.emit();
  }

}
