import { Component, OnInit, Input } from '@angular/core';
import { FilterComponent, FilterHandler } from 'src/app/shared/filters/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PartnerRequest } from '../partner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-partner-filters',
  templateUrl: './partner-filters.component.html',
  styleUrls: ['./partner-filters.component.sass']
})
export class PartnerFiltersComponent implements OnInit, FilterComponent {
  @Input() filter: Subject<PartnerRequest>;
  @Input() filterHandler: FilterHandler;
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

  buildRequest(): PartnerRequest {
    return {
      searchQuery: this.searchQuery.value ? this.searchQuery.value : ''
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
    return !this.searchQuery.value;
  }
}
