import { Component, OnInit, Input } from '@angular/core';
import { FilterComponent, FilterHandler } from 'src/app/shared/filters/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslationRequest } from '../translation';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-translation-filters',
  templateUrl: './translation-filters.component.html',
  styleUrls: ['./translation-filters.component.sass']
})
export class TranslationFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<TranslationRequest>;
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

  buildRequest(): TranslationRequest {
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
