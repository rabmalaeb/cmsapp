import { Action } from '@ngrx/store';
import { LoginRequest } from '../login/login';
import { Admin } from '../../admin/admin';
import { ErrorResponse } from 'src/app/shared/models/error';
import { SetPasswordRequest, ResetPasswordRequest } from '../authentication';

export enum ActionTypes {
  LOGIN_REQUEST = '[Authentication] Login Request',
  LOGIN_FAILURE = '[Authentication] Login Failure',
  LOGIN_SUCCESS = '[Authentication] Login Success',
  RESET_PASSWORD_REQUEST = '[Authentication] Reset Password Request',
  RESET_PASSWORD_FAILURE = '[Authentication] Reset Password Failure',
  RESET_PASSWORD_SUCCESS = '[Authentication] Reset Password Success',
  SET_PASSWORD_REQUEST = '[Authentication] Set Password Request',
  SET_PASSWORD_FAILURE = '[Authentication] Set Password Failure',
  SET_PASSWORD_SUCCESS = '[Authentication] Set Password Success',
}

export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;
  constructor(public loginRequest: LoginRequest) { }
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { item: Admin }) { }
}

export class ResetPasswordRequestAction implements Action {
  readonly type = ActionTypes.RESET_PASSWORD_REQUEST;
  constructor(public resetPasswordRequest: ResetPasswordRequest) { }
}

export class ResetPasswordFailureAction implements Action {
  readonly type = ActionTypes.RESET_PASSWORD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class ResetPasswordSuccessAction implements Action {
  readonly type = ActionTypes.RESET_PASSWORD_SUCCESS;
  constructor(public payload: { message: string }) { }
}

export class SetPasswordRequestAction implements Action {
  readonly type = ActionTypes.SET_PASSWORD_REQUEST;
  constructor(public setPasswordRequest: SetPasswordRequest) { }
}

export class SetPasswordFailureAction implements Action {
  readonly type = ActionTypes.SET_PASSWORD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class SetPasswordSuccessAction implements Action {
  readonly type = ActionTypes.SET_PASSWORD_SUCCESS;
  constructor(public payload: { item: Admin }) { }
}
export type Actions =
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction
  | ResetPasswordRequestAction
  | ResetPasswordFailureAction
  | ResetPasswordSuccessAction
  | SetPasswordRequestAction
  | SetPasswordFailureAction
  | SetPasswordSuccessAction;
