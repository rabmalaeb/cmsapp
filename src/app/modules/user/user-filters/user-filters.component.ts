import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import FilterComponent from 'src/app/shared/filter';
import Request from 'src/app/shared/request';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.sass']
})
export class UserFiltersComponent implements OnInit, FilterComponent {
  @Output() filter = new EventEmitter<Request>();
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

  buildRequest(): User {
    return {
      firstName: this.firstName.value ? this.firstName.value : '',
      lastName: this.lastName.value ? this.lastName.value : '',
      email: this.email.value ? this.email.value : '',
      mobile: this.mobile.value ? this.mobile.value : ''
    };
  }

  buildForm(): void {
    this.filterForm = this.form.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: ['']
    });
  }

  get firstName() {
    return this.filterForm.get('firstName');
  }

  get lastName() {
    return this.filterForm.get('lastName');
  }

  get email() {
    return this.filterForm.get('email');
  }

  get mobile() {
    return this.filterForm.get('mobile');
  }

  get isFormEmpty() {
    return (
      !this.firstName.value &&
      !this.lastName.value &&
      !this.email.value &&
      !this.mobile.value
    );
  }
}
