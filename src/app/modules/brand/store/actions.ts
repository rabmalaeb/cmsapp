import { Action } from '@ngrx/store';
import { Brand, BrandRequest } from 'src/app/modules/brand/brand';
import { ErrorResponse } from 'src/app/shared/models/error';
import { PaginationControl } from 'src/app/shared/paginator';

export enum ActionTypes {
  LOAD_REQUEST = '[Brand] Load Request',
  LOAD_FAILURE = '[Brand] Load Failure',
  LOAD_SUCCESS = '[Brand] Load Success',
  GET_BRAND_REQUEST = '[Brand] Get Brand Request',
  GET_BRAND_SUCCESS = '[Brand] Get Brand Success',
  GET_BRAND_FAILURE = '[Brand] Get Brand Failure',
  ADD_BRAND_REQUEST = '[Brand] Add Brand Request',
  ADD_BRAND_SUCCESS = '[Brand] Add Brand Success',
  ADD_BRAND_FAILURE = '[Brand] Add Brand Failure',
  UPDATE_BRAND_REQUEST = '[Brand] Update Brand Request',
  UPDATE_BRAND_SUCCESS = '[Brand] Update Brand Success',
  UPDATE_BRAND_FAILURE = '[Brand] Update Brand Failure',
  DELETE_BRAND_REQUEST = '[Brand] Delete Brand Request',
  DELETE_BRAND_SUCCESS = '[Brand] Delete Brand Success',
  DELETE_BRAND_FAILURE = '[Brand] Delete Brand Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public brandRequest: BrandRequest = null) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Brand[], paginator: PaginationControl }) {}
}

export class GetBrandRequestAction implements Action {
  readonly type = ActionTypes.GET_BRAND_REQUEST;
  constructor(public id: number) {}
}

export class GetBrandSuccessAction implements Action {
  readonly type = ActionTypes.GET_BRAND_SUCCESS;
  constructor(public payload: { item: Brand }) {}
}

export class GetBrandFailureAction implements Action {
  readonly type = ActionTypes.GET_BRAND_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}
export class AddBrandRequestAction implements Action {
  readonly type = ActionTypes.ADD_BRAND_REQUEST;
  constructor(public brand: Brand) {}
}

export class AddBrandSuccessAction implements Action {
  readonly type = ActionTypes.ADD_BRAND_SUCCESS;
  constructor(public payload: { item: Brand }) {}
}

export class AddBrandFailureAction implements Action {
  readonly type = ActionTypes.ADD_BRAND_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class UpdateBrandRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_BRAND_REQUEST;
  constructor(public id: number, public brand: Brand) {}
}

export class UpdateBrandSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_BRAND_SUCCESS;
  constructor(public payload: { id: number; item: Brand }) {}
}

export class UpdateBrandFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_BRAND_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class DeleteBrandRequestAction implements Action {
  readonly type = ActionTypes.DELETE_BRAND_REQUEST;
  constructor(public id: number) {}
}

export class DeleteBrandSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_BRAND_SUCCESS;
  constructor(public payload: { id: number; items: Brand[] }) {}
}

export class DeleteBrandFailureAction implements Action {
  readonly type = ActionTypes.DELETE_BRAND_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetBrandRequestAction
  | GetBrandSuccessAction
  | GetBrandFailureAction
  | DeleteBrandRequestAction
  | DeleteBrandSuccessAction
  | DeleteBrandFailureAction
  | AddBrandRequestAction
  | AddBrandSuccessAction
  | AddBrandFailureAction
  | UpdateBrandRequestAction
  | UpdateBrandSuccessAction
  | UpdateBrandFailureAction;
