import { Action } from '@ngrx/store';
import { Product } from 'src/app/modules/product/product';
import { ErrorResponse } from 'src/app/models/general';

export enum ActionTypes {
  LOAD_REQUEST = '[Product] Load Request',
  LOAD_FAILURE = '[Product] Load Failure',
  LOAD_SUCCESS = '[Product] Load Success',
  GET_PRODUCT_REQUEST = '[Product] Get Product Request',
  GET_PRODUCT_SUCCESS = '[Product] Get Product Success',
  GET_PRODUCT_FAILURE = '[Product] Get Product Failure',
  ADD_PRODUCT_REQUEST = '[Product] Add Product Request',
  ADD_PRODUCT_SUCCESS = '[Product] Add Product Success',
  ADD_PRODUCT_FAILURE = '[Product] Add Product Failure',
  UPDATE_PRODUCT_REQUEST = '[Product] Update Product Request',
  UPDATE_PRODUCT_SUCCESS = '[Product] Update Product Success',
  UPDATE_PRODUCT_FAILURE = '[Product] Update Product Failure',
  DELETE_PRODUCT_REQUEST = '[Product] Delete Product Request',
  DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success',
  DELETE_PRODUCT_FAILURE = '[Product] Delete Product Failure'
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
  constructor(public payload: { items: Product[] }) {}
}

export class GetProductRequestAction implements Action {
  readonly type = ActionTypes.GET_PRODUCT_REQUEST;
  constructor(public id: number) {}
}

export class GetProductSuccessAction implements Action {
  readonly type = ActionTypes.GET_PRODUCT_SUCCESS;
  constructor(public payload: { item: Product }) {}
}

export class GetProductFailureAction implements Action {
  readonly type = ActionTypes.GET_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}
export class AddProductRequestAction implements Action {
  readonly type = ActionTypes.ADD_PRODUCT_REQUEST;
  constructor(public product: Product) {}
}

export class AddProductSuccessAction implements Action {
  readonly type = ActionTypes.ADD_PRODUCT_SUCCESS;
  constructor(public payload: { item: Product }) {}
}

export class AddProductFailureAction implements Action {
  readonly type = ActionTypes.ADD_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class UpdateProductRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT_REQUEST;
  constructor(public id: number, public product: Product) {}
}

export class UpdateProductSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: { id: number; item: Product }) {}
}

export class UpdateProductFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class DeleteProductRequestAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_REQUEST;
  constructor(public id: number) {}
}

export class DeleteProductSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public payload: { id: number; items: Product[] }) {}
}

export class DeleteProductFailureAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetProductRequestAction
  | GetProductSuccessAction
  | GetProductFailureAction
  | DeleteProductRequestAction
  | DeleteProductSuccessAction
  | DeleteProductFailureAction
  | AddProductRequestAction
  | AddProductSuccessAction
  | AddProductFailureAction
  | UpdateProductRequestAction
  | UpdateProductSuccessAction
  | UpdateProductFailureAction;
