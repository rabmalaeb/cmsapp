import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessagesService {
  constructor() {}

  private validationMessages = {
    name: [{ type: 'required', message: 'This field is required' }],
    firstName: [{ type: 'required', message: 'This field is required' }],
    lastName: [{ type: 'required', message: 'This field is required' }],
    description: [{ type: 'required', message: 'This field is required' }],
    mobile: [{ type: 'required', message: 'This field is required' }],
    email: [
      { type: 'required', message: 'This field is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],
    requiredField: [{ type: 'required', message: 'This field is required' }],
    password: [{ type: 'required', message: 'This field is required' }],
    confirmPassword: [
      { type: 'MatchPasswords', message: 'The passwords does not match' }
    ]
  };

  getValidationMessages() {
    return this.validationMessages;
  }
}
