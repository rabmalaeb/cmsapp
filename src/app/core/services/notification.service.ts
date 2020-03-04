import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { last, startWith, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorMessage: Subject<string> = new Subject();
  private successMessage: Subject<string> = new Subject();
  private isProgressBarLoading: Subject<any>;

  constructor() {
    this.isProgressBarLoading = new Subject<boolean>();
    this.isProgressBarLoading.pipe(
      startWith(false),
      distinctUntilChanged(),
      last()
    );
  }

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

  showProgressBar() {
    this.isProgressBarLoading.next(true);
  }

  hideProgressBar() {
    this.isProgressBarLoading.next(false);
  }

  get isLoading() {
    return this.isProgressBarLoading;
  }
}
