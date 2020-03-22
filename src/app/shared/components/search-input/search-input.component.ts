import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FilterHandler } from '../../filters/filter';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Output() filter = new EventEmitter<boolean>();
  @Input() filterHandler: FilterHandler;
  @Input() placeholder: string;
  searchForm: FormGroup;
  searchSubscription: Subscription;
  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.searchSubscription = this.searchItem.valueChanges
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.filterHandler.setSearchQuery(this.searchItem.value);
        this.filter.emit();
      });
  }

  buildForm() {
    this.searchForm = this.form.group({
      searchItem: ['']
    });
  }

  get searchItem() {
    return this.searchForm.get('searchItem');
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
