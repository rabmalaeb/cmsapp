import Request from './request';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export default interface FilterComponent {
  filter: Subject<Request>;
  filterForm: FormGroup;
  isFormEmpty: boolean;
  submitFilters(): void;
  resetFilters(): void;
  buildRequest(): Request;
  buildForm(): void;
}
