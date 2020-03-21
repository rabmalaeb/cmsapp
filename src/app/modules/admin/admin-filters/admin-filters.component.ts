import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminRequest } from '../admin';
import { FilterComponent, FilterHandler } from 'src/app/shared/filters/filter';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-admin-filters',
  templateUrl: './admin-filters.component.html',
  styleUrls: ['./admin-filters.component.sass']
})
export class AdminFiltersComponent implements OnInit, FilterComponent {
  constructor(private form: FormBuilder) {}

  @Input() filter: Subject<AdminRequest>;
  @Input() filterHandler: FilterHandler;

  filterForm: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.filterForm = this.form.group({
      searchQuery: ['']
    });
  }

  get searchQuery() {
    return this.filterForm.get('searchQuery');
  }

  submitFilters() {
    this.filter.next(this.buildRequest());
  }

  resetFilters() {
    this.filterForm.reset();
    this.submitFilters();
  }

  get isFormEmpty(): boolean {
    return !this.searchQuery.value;
  }

  buildRequest(): AdminRequest {
    return {
      searchQuery: this.searchQuery.value ? this.searchQuery.value : '',
    };
  }
}
