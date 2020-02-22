import { Action } from '@ngrx/store';
import { Supplier } from 'src/app/modules/supplier/supplier';

export enum ActionTypes {
  LOAD_REQUEST = '[Supplier] Load Request',
  LOAD_FAILURE = '[Supplier] Load Failure',
  LOAD_SUCCESS = '[Supplier] Load Success',
  GET_SUPPLIER_REQUEST = '[Supplier] Get Supplier Request',
  GET_SUPPLIER_SUCCESS = '[Supplier] Get Supplier Success',
  GET_SUPPLIER_FAILURE = '[Supplier] Get Supplier Failure',
  ADD_SUPPLIER_REQUEST = '[Supplier] Add Supplier Request',
  ADD_SUPPLIER_SUCCESS = '[Supplier] Add Supplier Success',
  ADD_SUPPLIER_FAILURE = '[Supplier] Add Supplier Failure',
  UPDATE_SUPPLIER_REQUEST = '[Supplier] Update Supplier Request',
  UPDATE_SUPPLIER_SUCCESS = '[Supplier] Update Supplier Success',
  UPDATE_SUPPLIER_FAILURE = '[Supplier] Update Supplier Failure',
  DELETE_SUPPLIER_REQUEST = '[Supplier] Delete Supplier Request',
  DELETE_SUPPLIER_SUCCESS = '[Supplier] Delete Supplier Success',
  DELETE_SUPPLIER_FAILURE = '[Supplier] Delete Supplier Failure'
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
  constructor(public payload: { items: Supplier[] }) {}
}

export class GetSupplierRequestAction implements Action {
  readonly type = ActionTypes.GET_SUPPLIER_REQUEST;
  constructor(public id: number) {}
}

export class GetSupplierSuccessAction implements Action {
  readonly type = ActionTypes.GET_SUPPLIER_SUCCESS;
  constructor(public payload: { item: Supplier }) {}
}

export class GetSupplierFailureAction implements Action {
  readonly type = ActionTypes.GET_SUPPLIER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}
export class AddSupplierRequestAction implements Action {
  readonly type = ActionTypes.ADD_SUPPLIER_REQUEST;
  constructor(public supplier: Supplier) {}
}

export class AddSupplierSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUPPLIER_SUCCESS;
  constructor(public payload: { item: Supplier }) {}
}

export class AddSupplierFailureAction implements Action {
  readonly type = ActionTypes.ADD_SUPPLIER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class UpdateSupplierRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_SUPPLIER_REQUEST;
  constructor(public id: number, public supplier: Supplier) {}
}

export class UpdateSupplierSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUPPLIER_SUCCESS;
  constructor(public payload: { id: number; item: Supplier }) {}
}

export class UpdateSupplierFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_SUPPLIER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class DeleteSupplierRequestAction implements Action {
  readonly type = ActionTypes.DELETE_SUPPLIER_REQUEST;
  constructor(public id: number) {}
}

export class DeleteSupplierSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUPPLIER_SUCCESS;
  constructor(public payload: { id: number; items: Supplier[] }) {}
}

export class DeleteSupplierFailureAction implements Action {
  readonly type = ActionTypes.DELETE_SUPPLIER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetSupplierRequestAction
  | GetSupplierSuccessAction
  | GetSupplierFailureAction
  | DeleteSupplierRequestAction
  | DeleteSupplierSuccessAction
  | DeleteSupplierFailureAction
  | AddSupplierRequestAction
  | AddSupplierSuccessAction
  | AddSupplierFailureAction
  | UpdateSupplierRequestAction
  | UpdateSupplierSuccessAction
  | UpdateSupplierFailureAction;
