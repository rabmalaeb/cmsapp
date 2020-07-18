import { Action } from '@ngrx/store';
import { Country } from 'src/app/modules/country/country';
import { ErrorResponse } from 'src/app/shared/models/error';

export enum ActionTypes {
  LOAD_REQUEST = '[Country] Load Request',
  LOAD_FAILURE = '[Country] Load Failure',
  LOAD_SUCCESS = '[Country] Load Success',
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Country[] }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction;
