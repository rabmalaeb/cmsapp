import { Action } from '@ngrx/store';
import { Admin } from 'src/app/modules/admin/admin';

export enum ActionTypes {
  LOAD_REQUEST = '[Admin] Load Request',
  LOAD_FAILURE = '[Admin] Load Failure',
  LOAD_SUCCESS = '[Admin] Load Success',
  GET_ADMIN_REQUEST = '[Admin] Get Admin Request',
  GET_ADMIN_SUCCESS = '[Admin] Get Admin Success',
  GET_ADMIN_FAILURE = '[Admin] Get Admin Failure',
  ADD_ADMIN_REQUEST = '[Admin] Add Admin Request',
  ADD_ADMIN_SUCCESS = '[Admin] Add Admin Success',
  ADD_ADMIN_FAILURE = '[Admin] Add Admin Failure',
  UPDATE_ADMIN_REQUEST = '[Admin] Update Admin Request',
  UPDATE_ADMIN_SUCCESS = '[Admin] Update Admin Success',
  UPDATE_ADMIN_FAILURE = '[Admin] Update Admin Failure',
  DELETE_ADMIN_REQUEST = '[Admin] Delete Admin Request',
  DELETE_ADMIN_SUCCESS = '[Admin] Delete Admin Success',
  DELETE_ADMIN_FAILURE = '[Admin] Delete Admin Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Admin[] }) {}
}

export class GetAdminRequestAction implements Action {
  readonly type = ActionTypes.GET_ADMIN_REQUEST;
  constructor(public id: number) {}
}

export class GetAdminSuccessAction implements Action {
  readonly type = ActionTypes.GET_ADMIN_SUCCESS;
  constructor(public payload: { item: Admin }) {}
}

export class GetAdminFailureAction implements Action {
  readonly type = ActionTypes.GET_ADMIN_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class AddAdminRequestAction implements Action {
  readonly type = ActionTypes.ADD_ADMIN_REQUEST;
  constructor(public admin: Admin) {}
}

export class AddAdminSuccessAction implements Action {
  readonly type = ActionTypes.ADD_ADMIN_SUCCESS;
  constructor(public payload: { item: Admin }) {}
}

export class AddAdminFailureAction implements Action {
  readonly type = ActionTypes.ADD_ADMIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateAdminRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_ADMIN_REQUEST;
  constructor(public id: number, public admin: Admin) {}
}

export class UpdateAdminSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_ADMIN_SUCCESS;
  constructor(public payload: { id: number; item: Admin }) {}
}

export class UpdateAdminFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_ADMIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DeleteAdminRequestAction implements Action {
  readonly type = ActionTypes.DELETE_ADMIN_REQUEST;
  constructor(public id: number) {}
}

export class DeleteAdminSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_ADMIN_SUCCESS;
  constructor(public payload: { id: number; items: Admin[] }) {}
}

export class DeleteAdminFailureAction implements Action {
  readonly type = ActionTypes.DELETE_ADMIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetAdminRequestAction
  | GetAdminSuccessAction
  | GetAdminFailureAction
  | DeleteAdminRequestAction
  | DeleteAdminSuccessAction
  | DeleteAdminFailureAction
  | AddAdminRequestAction
  | AddAdminSuccessAction
  | AddAdminFailureAction
  | UpdateAdminRequestAction
  | UpdateAdminSuccessAction
  | UpdateAdminFailureAction;
