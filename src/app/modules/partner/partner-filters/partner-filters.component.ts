import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PartnerRequest } from '../partner';

@Component({
  selector: 'app-partner-filters',
  templateUrl: './partner-filters.component.html',
  styleUrls: ['./partner-filters.component.sass']
})
export class PartnerFiltersComponent implements OnInit, FilterComponent {
  @Output() filter = new EventEmitter<PartnerRequest>();
  filterForm: FormGroup;

  constructor(private form: FormBuilder) {}

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

  buildRequest(): PartnerRequest {
    return {
      name: this.name.value ? this.name.value : ''
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
    return !this.name.value;
  }
}
