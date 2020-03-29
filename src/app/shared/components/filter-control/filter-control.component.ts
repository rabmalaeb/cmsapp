import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import Request from '../../request';
import { FilterHandler } from '../../filters/filter';

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.scss']
})
export class FilterControlComponent implements OnInit {
  @Output() filter = new EventEmitter<Request>();
  @Input() filterHandler: FilterHandler;
  @Input() label: string;
  showModal = false;
  constructor() {}

  ngOnInit() {}

  submitFilters() {
    this.showModal = false;
    this.filter.emit();
  }

  resetFilters() {
    this.filterHandler.resetSubject.next(true);
  }

  closeModal() {
    this.showModal = false;
  }
}
