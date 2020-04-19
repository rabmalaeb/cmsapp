export enum AuthenticationSteps {
  LOGIN,
  RESET_PASSWORD,
  SET_NEW_PASSWORD
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SetPasswordRequest {
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
}
