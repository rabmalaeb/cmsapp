import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessagesService {
  constructor() {}

  private validationMessages = {
    requiredField: [
      { type: 'required', message: 'This field is required' },
      { type: 'MatchPasswords', message: 'The passwords does not match' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
  };

  getValidationMessages() {
    return this.validationMessages;
  }
}
