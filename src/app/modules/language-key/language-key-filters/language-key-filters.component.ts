import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LanguageKeyRequest } from '../language-key';

@Component({
  selector: 'app-language-key-filters',
  templateUrl: './language-key-filters.component.html',
  styleUrls: ['./language-key-filters.component.sass']
})
export class LanguageKeyFiltersComponent implements OnInit, FilterComponent {

  @Output() filter = new EventEmitter<LanguageKeyRequest>();
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

  buildRequest(): LanguageKeyRequest {
    return {
      name: this.name.value ? this.name.value : '',
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
