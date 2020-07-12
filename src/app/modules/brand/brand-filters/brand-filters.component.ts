import { Component, OnInit, Input } from '@angular/core';
import { FilterComponent, FilterHandler } from 'src/app/shared/filters/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BrandRequest } from '../brand';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-brand-filters',
  templateUrl: './brand-filters.component.html',
  styleUrls: ['./brand-filters.component.sass']
})
export class BrandFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<BrandRequest>;
  @Input() filterHandler: FilterHandler;
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

  buildRequest(): BrandRequest {
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
