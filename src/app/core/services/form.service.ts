import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { FormGroup } from '@angular/forms';
import { ErrorMessages } from 'src/app/shared/models/messages';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private notificationService: NotificationService) {}

  /**
   * show a Notification if the form is not valid and returns false
   * @param form form to be validated
   */
  isFormValid(form: FormGroup) {
    if (!form.valid) {
      form.markAllAsTouched();
      this.notificationService.showError(ErrorMessages.FORM_NOT_VALID);
      return false;
    }
    return true;
  }
}
