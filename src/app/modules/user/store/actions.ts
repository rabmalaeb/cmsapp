import { Action } from '@ngrx/store';
import { User } from 'src/app/modules/user/user';

export enum ActionTypes {
  LOAD_REQUEST = '[User] Load Request',
  LOAD_FAILURE = '[User] Load Failure',
  LOAD_SUCCESS = '[User] Load Success',
  GET_USER_REQUEST = '[User] Get User Request',
  GET_USER_SUCCESS = '[User] Get User Success',
  GET_USER_FAILURE = '[User] Get User Failure',
  ADD_USER_REQUEST = '[User] Add User Request',
  ADD_USER_SUCCESS = '[User] Add User Success',
  ADD_USER_FAILURE = '[User] Add User Failure',
  UPDATE_USER_REQUEST = '[User] Update User Request',
  UPDATE_USER_SUCCESS = '[User] Update User Success',
  UPDATE_USER_FAILURE = '[User] Update User Failure',
  DELETE_USER_REQUEST = '[User] Delete User Request',
  DELETE_USER_SUCCESS = '[User] Delete User Success',
  DELETE_USER_FAILURE = '[User] Delete User Failure'
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
  constructor(public payload: { items: User[] }) {}
}

export class GetUserRequestAction implements Action {
  readonly type = ActionTypes.GET_USER_REQUEST;
  constructor(public id: number) {}
}

export class GetUserSuccessAction implements Action {
  readonly type = ActionTypes.GET_USER_SUCCESS;
  constructor(public payload: { item: User }) {}
}

export class GetUserFailureAction implements Action {
  readonly type = ActionTypes.GET_USER_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class AddUserRequestAction implements Action {
  readonly type = ActionTypes.ADD_USER_REQUEST;
  constructor(public user: User) {}
}

export class AddUserSuccessAction implements Action {
  readonly type = ActionTypes.ADD_USER_SUCCESS;
  constructor(public payload: { item: User }) {}
}

export class AddUserFailureAction implements Action {
  readonly type = ActionTypes.ADD_USER_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateUserRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_USER_REQUEST;
  constructor(public id: number, public user: User) {}
}

export class UpdateUserSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: { id: number, item: User }) {}
}

export class UpdateUserFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_USER_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DeleteUserRequestAction implements Action {
  readonly type = ActionTypes.DELETE_USER_REQUEST;
  constructor(public id: number) {}
}

export class DeleteUserSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_USER_SUCCESS;
  constructor(public payload: { id: number, items: User[] }) {}
}

export class DeleteUserFailureAction implements Action {
  readonly type = ActionTypes.DELETE_USER_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction
  | AddUserRequestAction
  | AddUserSuccessAction
  | AddUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction;
