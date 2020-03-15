import { Component, OnInit, Input } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PermissionRequest } from '../permission';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-permission-filters',
  templateUrl: './permission-filters.component.html',
  styleUrls: ['./permission-filters.component.sass']
})
export class PermissionFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<PermissionRequest>;
  filterForm: FormGroup;

  constructor(private form: FormBuilder) { }

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

  buildRequest(): PermissionRequest {
    return {
      searchQuery: this.searchQuery.value ? this.searchQuery.value : '',
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      searchQuery: ['']
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
