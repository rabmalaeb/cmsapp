import { Component, OnInit, Input } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LanguageKeyRequest } from '../language-key';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-language-key-filters',
  templateUrl: './language-key-filters.component.html',
  styleUrls: ['./language-key-filters.component.sass']
})
export class LanguageKeyFiltersComponent implements OnInit, FilterComponent {

  @Input() filter: Subject<LanguageKeyRequest>;
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

  buildRequest(): LanguageKeyRequest {
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
