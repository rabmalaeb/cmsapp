
export interface ErrorResponse {
  status: number;
  message: string;
}

export enum ErrorMessages {
  DEFAULT_ERROR_MESSAGE = 'An Error has occurred. Please try again',
  SOMETHING_WENT_WRONG = 'Something went wrong, please try again. If the problem persists please contact the system administrator',
  FORM_NOT_VALID = 'The form is not valid',
  COULD_NOT_LOGIN_IN = 'Could not log you in with the provided credentials',
  RESET_REQUEST_ERROR = 'Could not send Password Reset request'
}
