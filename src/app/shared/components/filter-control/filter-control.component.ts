import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import Request from '../../request';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.scss']
})
export class FilterControlComponent implements OnInit, OnChanges, OnDestroy {
  @Output() filter = new EventEmitter<Request>();
  @Input() filterSubject: Subject<Request>;
  @Input() resetSubject: Subject<boolean>;
  @Input() label: string;
  request: Request;
  showModal = false;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.filterSubject.subscribe(request => {
      this.request = request;
    });
  }

  submitFilters() {
    this.showModal = false;
    this.filter.emit(this.request);
  }

  resetFilters() {
    this.resetSubject.next(true);
  }

  ngOnDestroy() {
    this.filterSubject.unsubscribe();
  }
}
