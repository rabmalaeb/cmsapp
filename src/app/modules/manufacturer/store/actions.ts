import { Action } from '@ngrx/store';
import { Manufacturer, ManufacturerRequest } from 'src/app/modules/manufacturer/manufacturer';
import { ErrorResponse } from 'src/app/shared/models/error';
import { PaginationControl } from 'src/app/shared/paginator';

export enum ActionTypes {
  LOAD_REQUEST = '[Manufacturer] Load Request',
  LOAD_FAILURE = '[Manufacturer] Load Failure',
  LOAD_SUCCESS = '[Manufacturer] Load Success',
  GET_LANGUAGE_REQUEST = '[Manufacturer] Get Manufacturer Request',
  GET_LANGUAGE_SUCCESS = '[Manufacturer] Get Manufacturer Success',
  GET_LANGUAGE_FAILURE = '[Manufacturer] Get Manufacturer Failure',
  ADD_LANGUAGE_REQUEST = '[Manufacturer] Add Manufacturer Request',
  ADD_LANGUAGE_SUCCESS = '[Manufacturer] Add Manufacturer Success',
  ADD_LANGUAGE_FAILURE = '[Manufacturer] Add Manufacturer Failure',
  UPDATE_LANGUAGE_REQUEST = '[Manufacturer] Update Manufacturer Request',
  UPDATE_LANGUAGE_SUCCESS = '[Manufacturer] Update Manufacturer Success',
  UPDATE_LANGUAGE_FAILURE = '[Manufacturer] Update Manufacturer Failure',
  DELETE_LANGUAGE_REQUEST = '[Manufacturer] Delete Manufacturer Request',
  DELETE_LANGUAGE_SUCCESS = '[Manufacturer] Delete Manufacturer Success',
  DELETE_LANGUAGE_FAILURE = '[Manufacturer] Delete Manufacturer Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public languageRequest: ManufacturerRequest = null) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Manufacturer[], paginator: PaginationControl }) {}
}

export class GetManufacturerRequestAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGE_REQUEST;
  constructor(public id: number) {}
}

export class GetManufacturerSuccessAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGE_SUCCESS;
  constructor(public payload: { item: Manufacturer }) {}
}

export class GetManufacturerFailureAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}
export class AddManufacturerRequestAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGE_REQUEST;
  constructor(public manufacturer: Manufacturer) {}
}

export class AddManufacturerSuccessAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGE_SUCCESS;
  constructor(public payload: { item: Manufacturer }) {}
}

export class AddManufacturerFailureAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class UpdateManufacturerRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGE_REQUEST;
  constructor(public id: number, public manufacturer: Manufacturer) {}
}

export class UpdateManufacturerSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGE_SUCCESS;
  constructor(public payload: { id: number; item: Manufacturer }) {}
}

export class UpdateManufacturerFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class DeleteManufacturerRequestAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGE_REQUEST;
  constructor(public id: number) {}
}

export class DeleteManufacturerSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGE_SUCCESS;
  constructor(public payload: { id: number; items: Manufacturer[] }) {}
}

export class DeleteManufacturerFailureAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetManufacturerRequestAction
  | GetManufacturerSuccessAction
  | GetManufacturerFailureAction
  | DeleteManufacturerRequestAction
  | DeleteManufacturerSuccessAction
  | DeleteManufacturerFailureAction
  | AddManufacturerRequestAction
  | AddManufacturerSuccessAction
  | AddManufacturerFailureAction
  | UpdateManufacturerRequestAction
  | UpdateManufacturerSuccessAction
  | UpdateManufacturerFailureAction;
