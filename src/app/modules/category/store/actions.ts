import { Action } from '@ngrx/store';
import { Category, CategoryRequest } from 'src/app/modules/category/category';
import { ErrorResponse } from 'src/app/shared/models/error';
import { PaginationControl } from 'src/app/shared/paginator';

export enum ActionTypes {
  LOAD_REQUEST = '[Category] Load Request',
  LOAD_FAILURE = '[Category] Load Failure',
  LOAD_SUCCESS = '[Category] Load Success',
  GET_CATEGORY_REQUEST = '[Category] Get Category Request',
  GET_CATEGORY_SUCCESS = '[Category] Get Category Success',
  GET_CATEGORY_FAILURE = '[Category] Get Category Failure',
  ADD_CATEGORY_REQUEST = '[Category] Add Category Request',
  ADD_CATEGORY_SUCCESS = '[Category] Add Category Success',
  ADD_CATEGORY_FAILURE = '[Category] Add Category Failure',
  UPDATE_CATEGORY_REQUEST = '[Category] Update Category Request',
  UPDATE_CATEGORY_SUCCESS = '[Category] Update Category Success',
  UPDATE_CATEGORY_FAILURE = '[Category] Update Category Failure',
  DELETE_CATEGORY_REQUEST = '[Category] Delete Category Request',
  DELETE_CATEGORY_SUCCESS = '[Category] Delete Category Success',
  DELETE_CATEGORY_FAILURE = '[Category] Delete Category Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public categoryRequest: CategoryRequest = null) { }
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Category[], paginator: PaginationControl }) {}
}

export class GetCategoryRequestAction implements Action {
  readonly type = ActionTypes.GET_CATEGORY_REQUEST;
  constructor(public id: number) {}
}

export class GetCategorySuccessAction implements Action {
  readonly type = ActionTypes.GET_CATEGORY_SUCCESS;
  constructor(public payload: { item: Category }) {}
}

export class GetCategoryFailureAction implements Action {
  readonly type = ActionTypes.GET_CATEGORY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}
export class AddCategoryRequestAction implements Action {
  readonly type = ActionTypes.ADD_CATEGORY_REQUEST;
  constructor(public category: Category) {}
}

export class AddCategorySuccessAction implements Action {
  readonly type = ActionTypes.ADD_CATEGORY_SUCCESS;
  constructor(public payload: { item: Category }) {}
}

export class AddCategoryFailureAction implements Action {
  readonly type = ActionTypes.ADD_CATEGORY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class UpdateCategoryRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_CATEGORY_REQUEST;
  constructor(public id: number, public category: Category) {}
}

export class UpdateCategorySuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: { id: number; item: Category }) {}
}

export class UpdateCategoryFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_CATEGORY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class DeleteCategoryRequestAction implements Action {
  readonly type = ActionTypes.DELETE_CATEGORY_REQUEST;
  constructor(public id: number) {}
}

export class DeleteCategorySuccessAction implements Action {
  readonly type = ActionTypes.DELETE_CATEGORY_SUCCESS;
  constructor(public payload: { id: number; items: Category[] }) {}
}

export class DeleteCategoryFailureAction implements Action {
  readonly type = ActionTypes.DELETE_CATEGORY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetCategoryRequestAction
  | GetCategorySuccessAction
  | GetCategoryFailureAction
  | DeleteCategoryRequestAction
  | DeleteCategorySuccessAction
  | DeleteCategoryFailureAction
  | AddCategoryRequestAction
  | AddCategorySuccessAction
  | AddCategoryFailureAction
  | UpdateCategoryRequestAction
  | UpdateCategorySuccessAction
  | UpdateCategoryFailureAction;
