import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminRequest } from '../admin';
import FilterComponent from 'src/app/shared/filter';

@Component({
  selector: 'app-admin-filters',
  templateUrl: './admin-filters.component.html',
  styleUrls: ['./admin-filters.component.sass']
})
export class AdminFiltersComponent implements OnInit, FilterComponent {
  constructor(private form: FormBuilder) {}

  @Output() filter = new EventEmitter<AdminRequest>();

  filterForm: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.filterForm = this.form.group({
      name: [''],
      email: ['']
    });
  }

  get name() {
    return this.filterForm.get('name');
  }

  get email() {
    return this.filterForm.get('email');
  }

  submitFilters() {
    this.filter.emit(this.buildRequest());
  }

  resetFilters() {
    this.filterForm.reset();
    this.submitFilters();
  }

  get isFormEmpty(): boolean {
    return !this.email.value && !this.name.value;
  }

  buildRequest(): AdminRequest {
    return {
      name: this.name.value ? this.name.value : '',
      email: this.email.value ? this.email.value : ''
    };
  }
}
