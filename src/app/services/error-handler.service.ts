import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleErrorResponse(errorResponse) {
    if (errorResponse.error && errorResponse.error.errors) {
      errorResponse.error.errors.forEach(error => {
        this.notificationService.showError(error.detail);
      });
    } else {
      this.notificationService.showError('An Error has Occurred');
    }
  }
}
