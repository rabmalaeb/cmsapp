import { Component, OnInit, Input } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import Request from 'src/app/shared/request';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserRequest } from '../user';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.sass']
})
export class UserFiltersComponent implements OnInit, FilterComponent {
  @Input() filter: Subject<Request>;
  filterForm: FormGroup;

  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  submitFilters(): void {
    this.filter.next(this.buildRequest());
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.submitFilters();
  }

  buildRequest(): UserRequest {
    return {
      searchQuery: this.searchQuery.value ? this.searchQuery.value : '',
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      searchQuery: [''],
    });
  }

  get searchQuery() {
    return this.filterForm.get('searchQuery');
  }

  get isFormEmpty() {
    return (
      !this.searchQuery.value
    );
  }
}
