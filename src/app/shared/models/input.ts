import { FormControl } from '@angular/forms';

export interface InputError {
  hasError: boolean;
  errorMessage: string;
}
export function checkFormControlErrors(
  formControl: FormControl,
  errorMessages: any
): InputError {
  let result = false;
  let hasError = false;
  let errorMessage = null;
  if (errorMessages && errorMessages.length > 0) {
    errorMessages.forEach(error => {
      if (formControl.hasError(error.type)) {
        result = true;
        errorMessage = error.message;
      }
    });
    hasError = result && (formControl.dirty || formControl.touched);
  }
  return {
    hasError,
    errorMessage
  };
}
