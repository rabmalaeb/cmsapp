import Request from './request';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export default interface FilterComponent {
  filter: EventEmitter<Request>;
  filterForm: FormGroup;
  isFormEmpty: boolean;
  submitFilters(): void;
  resetFilters(): void;
  buildRequest(): Request;
  buildForm(): void;
}
