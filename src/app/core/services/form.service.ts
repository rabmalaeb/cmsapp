import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { FormGroup } from '@angular/forms';
import { ErrorMessages } from 'src/app/shared/models/error';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private notificationService: NotificationService) {}

  isFormValid(form: FormGroup) {
    if (!form.valid) {
      this.notificationService.showError(ErrorMessages.FORM_NOT_VALID);
      return false;
    }
    return true;
  }
}
