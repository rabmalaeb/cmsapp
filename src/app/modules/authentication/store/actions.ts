import { Action } from '@ngrx/store';
import { LoginRequest } from '../login/login';
import { Admin } from '../../admin/admin';
import { ErrorResponse } from 'src/app/shared/models/error';

export enum ActionTypes {
  LOAD_REQUEST = '[Login] Load Request',
  LOAD_FAILURE = '[Login] Load Failure',
  LOAD_SUCCESS = '[Login] Load Success',
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public loginRequest: LoginRequest) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { item: Admin }) {}
}
export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction;
