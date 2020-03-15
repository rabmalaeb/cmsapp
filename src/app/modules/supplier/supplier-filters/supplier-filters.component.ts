import { Component, OnInit, Input } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SupplierRequest } from '../supplier';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-supplier-filters',
  templateUrl: './supplier-filters.component.html',
  styleUrls: ['./supplier-filters.component.sass']
})
export class SupplierFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<SupplierRequest>;
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

  buildRequest(): SupplierRequest {
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
