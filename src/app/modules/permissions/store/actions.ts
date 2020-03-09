import { Action } from '@ngrx/store';
import { Permission, PermissionRequest, PermissionActionRequest } from '../permission';
import { ErrorResponse } from 'src/app/shared/models/general';

export enum ActionTypes {
  LOAD_REQUEST = '[Permission] Load Request',
  LOAD_FAILURE = '[Permission] Load Failure',
  LOAD_SUCCESS = '[Permission] Load Success',
  LOAD_PERMISSIONS_BY_ROLE_REQUEST = '[Permission] Load Permissions By Role Request',
  LOAD_PERMISSIONS_BY_ROLE_FAILURE = '[Permission] Load Permissions By Role Failure',
  LOAD_PERMISSIONS_BY_ROLE_SUCCESS = '[Permission] Load Permissions By Role Success',
  GET_PERMISSION_REQUEST = '[Permission] Get Permission Request',
  GET_PERMISSION_SUCCESS = '[Permission] Get Permission Success',
  GET_PERMISSION_FAILURE = '[Permission] Get Permission Failure',
  ADD_PERMISSION_REQUEST = '[Permission] Add Permission Request',
  ADD_PERMISSION_SUCCESS = '[Permission] Add Permission Success',
  ADD_PERMISSION_FAILURE = '[Permission] Add Permission Failure',
  UPDATE_PERMISSION_REQUEST = '[Permission] Update Permission Request',
  UPDATE_PERMISSION_SUCCESS = '[Permission] Update Permission Success',
  UPDATE_PERMISSION_FAILURE = '[Permission] Update Permission Failure',
  DELETE_PERMISSION_REQUEST = '[Permission] Delete Permission Request',
  DELETE_PERMISSION_SUCCESS = '[Permission] Delete Permission Success',
  DELETE_PERMISSION_FAILURE = '[Permission] Delete Permission Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public permissionRequest: PermissionRequest = null) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Permission[] }) {}
}

export class LoadPermissionsByRoleAction implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_BY_ROLE_REQUEST;
  constructor(public id: number) {}
}

export class LoadRolePermissionSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_BY_ROLE_SUCCESS;
  constructor(public payload: { items: Permission[] }) {}
}

export class LoadRolePermissionFailureAction implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_BY_ROLE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class GetPermissionRequestAction implements Action {
  readonly type = ActionTypes.GET_PERMISSION_REQUEST;
  constructor(public id: number) {}
}

export class GetPermissionSuccessAction implements Action {
  readonly type = ActionTypes.GET_PERMISSION_SUCCESS;
  constructor(public payload: { item: Permission }) {}
}

export class GetPermissionFailureAction implements Action {
  readonly type = ActionTypes.GET_PERMISSION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}
export class AddPermissionRequestAction implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_REQUEST;
  constructor(public permission: PermissionActionRequest) {}
}

export class AddPermissionSuccessAction implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_SUCCESS;
  constructor(public payload: { item: Permission }) {}
}

export class AddPermissionFailureAction implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class UpdatePermissionRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_REQUEST;
  constructor(public id: number, public permission: PermissionActionRequest) {}
}

export class UpdatePermissionSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_SUCCESS;
  constructor(public payload: { id: number; item: Permission }) {}
}

export class UpdatePermissionFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class DeletePermissionRequestAction implements Action {
  readonly type = ActionTypes.DELETE_PERMISSION_REQUEST;
  constructor(public id: number) {}
}

export class DeletePermissionSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_PERMISSION_SUCCESS;
  constructor(public payload: { id: number; items: Permission[] }) {}
}

export class DeletePermissionFailureAction implements Action {
  readonly type = ActionTypes.DELETE_PERMISSION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | LoadPermissionsByRoleAction
  | LoadRolePermissionFailureAction
  | LoadRolePermissionSuccessAction
  | GetPermissionRequestAction
  | GetPermissionSuccessAction
  | GetPermissionFailureAction
  | DeletePermissionRequestAction
  | DeletePermissionSuccessAction
  | DeletePermissionFailureAction
  | AddPermissionRequestAction
  | AddPermissionSuccessAction
  | AddPermissionFailureAction
  | UpdatePermissionRequestAction
  | UpdatePermissionSuccessAction
  | UpdatePermissionFailureAction;
