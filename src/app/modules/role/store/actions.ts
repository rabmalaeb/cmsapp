import { Action } from '@ngrx/store';
import { Role, RoleRequest } from 'src/app/modules/role/role';
import { ErrorResponse } from 'src/app/models/general';

export enum ActionTypes {
  LOAD_REQUEST = '[Role] Load Request',
  LOAD_FAILURE = '[Role] Load Failure',
  LOAD_SUCCESS = '[Role] Load Success',
  GET_ROLE_REQUEST = '[Role] Get Role Request',
  GET_ROLE_SUCCESS = '[Role] Get Role Success',
  GET_ROLE_FAILURE = '[Role] Get Role Failure',
  GET_ROLE_BY_PARTNER_REQUEST = '[Role] Get Role By Partner Request',
  GET_ROLE_BY_PARTNER_SUCCESS = '[Role] Get Role By Partner Success',
  GET_ROLE_BY_PARTNER_FAILURE = '[Role] Get Role By Partner Failure',
  ADD_ROLE_REQUEST = '[Role] Add Role Request',
  ADD_ROLE_SUCCESS = '[Role] Add Role Success',
  ADD_ROLE_FAILURE = '[Role] Add Role Failure',
  UPDATE_ROLE_REQUEST = '[Role] Update Role Request',
  UPDATE_ROLE_SUCCESS = '[Role] Update Role Success',
  UPDATE_ROLE_FAILURE = '[Role] Update Role Failure',
  DELETE_ROLE_REQUEST = '[Role] Delete Role Request',
  DELETE_ROLE_SUCCESS = '[Role] Delete Role Success',
  DELETE_ROLE_FAILURE = '[Role] Delete Role Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Role[] }) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class GetRolesByPartnerRequestAction implements Action {
  readonly type = ActionTypes.GET_ROLE_BY_PARTNER_REQUEST;
  constructor(public partnerId: number) {}
}

export class GetRolesByPartnerSuccessAction implements Action {
  readonly type = ActionTypes.GET_ROLE_BY_PARTNER_SUCCESS;
  constructor(public payload: { items: Role[] }) {}
}

export class GetRolesByPartnerFailureAction implements Action {
  readonly type = ActionTypes.GET_ROLE_BY_PARTNER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class GetRoleRequestAction implements Action {
  readonly type = ActionTypes.GET_ROLE_REQUEST;
  constructor(public id: number) {}
}

export class GetRoleSuccessAction implements Action {
  readonly type = ActionTypes.GET_ROLE_SUCCESS;
  constructor(public payload: { item: Role }) {}
}

export class GetRoleFailureAction implements Action {
  readonly type = ActionTypes.GET_ROLE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}
export class AddRoleRequestAction implements Action {
  readonly type = ActionTypes.ADD_ROLE_REQUEST;
  constructor(public role: RoleRequest) {}
}

export class AddRoleSuccessAction implements Action {
  readonly type = ActionTypes.ADD_ROLE_SUCCESS;
  constructor(public payload: { item: Role }) {}
}

export class AddRoleFailureAction implements Action {
  readonly type = ActionTypes.ADD_ROLE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class UpdateRoleRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_ROLE_REQUEST;
  constructor(public id: number, public role: RoleRequest) {}
}

export class UpdateRoleSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_ROLE_SUCCESS;
  constructor(public payload: { id: number; item: Role }) {}
}

export class UpdateRoleFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_ROLE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class DeleteRoleRequestAction implements Action {
  readonly type = ActionTypes.DELETE_ROLE_REQUEST;
  constructor(public id: number) {}
}

export class DeleteRoleSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_ROLE_SUCCESS;
  constructor(public payload: { id: number; items: Role[] }) {}
}

export class DeleteRoleFailureAction implements Action {
  readonly type = ActionTypes.DELETE_ROLE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetRoleRequestAction
  | GetRoleSuccessAction
  | GetRoleFailureAction
  | DeleteRoleRequestAction
  | DeleteRoleSuccessAction
  | DeleteRoleFailureAction
  | AddRoleRequestAction
  | AddRoleSuccessAction
  | AddRoleFailureAction
  | GetRolesByPartnerFailureAction
  | GetRolesByPartnerRequestAction
  | GetRolesByPartnerSuccessAction
  | UpdateRoleRequestAction
  | UpdateRoleSuccessAction
  | UpdateRoleFailureAction;
