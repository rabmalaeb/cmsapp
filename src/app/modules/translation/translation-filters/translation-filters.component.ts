import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslationRequest } from '../translation';

@Component({
  selector: 'app-translation-filters',
  templateUrl: './translation-filters.component.html',
  styleUrls: ['./translation-filters.component.sass']
})
export class TranslationFiltersComponent implements OnInit, FilterComponent {

  @Output() filter = new EventEmitter<TranslationRequest>();
  filterForm: FormGroup;

  constructor(private form: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  submitFilters(): void {
    this.filter.emit(this.buildRequest());
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.submitFilters();
  }

  buildRequest(): TranslationRequest {
    return {
      value: this.name.value ? this.name.value : '',
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      name: ['']
    });
  }

  get name() {
    return this.filterForm.get('name');
  }

  get isFormEmpty() {
    return (
      !this.name.value
    );
  }

}
