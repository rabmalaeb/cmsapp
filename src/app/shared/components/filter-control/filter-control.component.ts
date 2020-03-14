import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Request from '../../request';

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.scss']
})
export class FilterControlComponent implements OnInit {
  @Output() filter = new EventEmitter<Request>();
  showModal = false;
  constructor() {}

  ngOnInit() {}

  submitFilters() {
    this.showModal = false;
    this.filter.emit();
  }
}
