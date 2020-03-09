import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminRequest } from '../admin';
import FilterComponent from 'src/app/shared/filter';

@Component({
  selector: 'app-admin-filters',
  templateUrl: './admin-filters.component.html',
  styleUrls: ['./admin-filters.component.sass']
})
export class AdminFiltersComponent implements OnInit, FilterComponent {
  constructor(private form: FormBuilder) {}

  @Output() filter = new EventEmitter<AdminRequest>();

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
    this.filter.emit(this.buildRequest());
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
