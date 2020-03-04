import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminRequest } from '../admin';

@Component({
  selector: 'app-admin-filters',
  templateUrl: './admin-filters.component.html',
  styleUrls: ['./admin-filters.component.sass']
})
export class AdminFiltersComponent implements OnInit {
  constructor(private form: FormBuilder) {}

  filterForm: FormGroup;
  @Output() filter = new EventEmitter<AdminRequest>();

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

  performAction() {
    const adminRequest: AdminRequest = {
      name: this.name.value,
      email: this.email.value
    };
    this.filter.emit(adminRequest);
  }

  resetFilters() {
    this.filterForm.reset();
  }
}
