import { Component, OnInit, Input } from '@angular/core';
import { FilterComponent, FilterHandler } from 'src/app/shared/filters/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManufacturerRequest } from '../manufacturer';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manufacturer-filters',
  templateUrl: './manufacturer-filters.component.html',
  styleUrls: ['./manufacturer-filters.component.sass']
})
export class ManufacturerFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<ManufacturerRequest>;
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

  buildRequest(): ManufacturerRequest {
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
