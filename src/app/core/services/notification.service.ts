import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorMessage: Subject<string> = new Subject();
  private successMessage: Subject<string> = new Subject();

  constructor() {}

  showError(message: string) {
    return this.errorMessage.next(message);
  }

  showSuccess(message: string) {
    return this.successMessage.next(message);
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  getSuccessMessage() {
    return this.successMessage;
  }
}
