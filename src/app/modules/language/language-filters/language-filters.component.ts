import { Component, OnInit, Input } from '@angular/core';
import { FilterComponent, FilterHandler } from 'src/app/shared/filters/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LanguageRequest } from '../language';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-language-filters',
  templateUrl: './language-filters.component.html',
  styleUrls: ['./language-filters.component.sass']
})
export class LanguageFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<LanguageRequest>;
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

  buildRequest(): LanguageRequest {
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
