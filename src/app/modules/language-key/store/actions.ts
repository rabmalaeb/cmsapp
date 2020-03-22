import { Action } from '@ngrx/store';
import { LanguageKey, LanguageKeyRequest } from '../language-key';
import { ErrorResponse } from 'src/app/shared/models/general';
import { PaginationControl } from 'src/app/shared/paginator';

export enum ActionTypes {
  LOAD_REQUEST = '[LanguageKey] Load Request',
  LOAD_FAILURE = '[LanguageKey] Load Failure',
  LOAD_SUCCESS = '[LanguageKey] Load Success',
  GET_LANGUAGEKEY_REQUEST = '[LanguageKey] Get LanguageKey Request',
  GET_LANGUAGEKEY_SUCCESS = '[LanguageKey] Get LanguageKey Success',
  GET_LANGUAGEKEY_FAILURE = '[LanguageKey] Get LanguageKey Failure',
  ADD_LANGUAGEKEY_REQUEST = '[LanguageKey] Add LanguageKey Request',
  ADD_LANGUAGEKEY_SUCCESS = '[LanguageKey] Add LanguageKey Success',
  ADD_LANGUAGEKEY_FAILURE = '[LanguageKey] Add LanguageKey Failure',
  UPDATE_LANGUAGEKEY_REQUEST = '[LanguageKey] Update LanguageKey Request',
  UPDATE_LANGUAGEKEY_SUCCESS = '[LanguageKey] Update LanguageKey Success',
  UPDATE_LANGUAGEKEY_FAILURE = '[LanguageKey] Update LanguageKey Failure',
  DELETE_LANGUAGEKEY_REQUEST = '[LanguageKey] Delete LanguageKey Request',
  DELETE_LANGUAGEKEY_SUCCESS = '[LanguageKey] Delete LanguageKey Success',
  DELETE_LANGUAGEKEY_FAILURE = '[LanguageKey] Delete LanguageKey Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public languageKeyRequest: LanguageKeyRequest = null) { }
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: LanguageKey[], paginator: PaginationControl }) {}
}

export class GetLanguageKeyRequestAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGEKEY_REQUEST;
  constructor(public id: number) {}
}

export class GetLanguageKeySuccessAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { item: LanguageKey }) {}
}

export class GetLanguageKeyFailureAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}
export class AddLanguageKeyRequestAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGEKEY_REQUEST;
  constructor(public languageKey: LanguageKey) {}
}

export class AddLanguageKeySuccessAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { item: LanguageKey }) {}
}

export class AddLanguageKeyFailureAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class UpdateLanguageKeyRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGEKEY_REQUEST;
  constructor(public id: number, public languageKey: LanguageKey) {}
}

export class UpdateLanguageKeySuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { id: number; item: LanguageKey }) {}
}

export class UpdateLanguageKeyFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class DeleteLanguageKeyRequestAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGEKEY_REQUEST;
  constructor(public id: number) {}
}

export class DeleteLanguageKeySuccessAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { id: number; items: LanguageKey[] }) {}
}

export class DeleteLanguageKeyFailureAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetLanguageKeyRequestAction
  | GetLanguageKeySuccessAction
  | GetLanguageKeyFailureAction
  | DeleteLanguageKeyRequestAction
  | DeleteLanguageKeySuccessAction
  | DeleteLanguageKeyFailureAction
  | AddLanguageKeyRequestAction
  | AddLanguageKeySuccessAction
  | AddLanguageKeyFailureAction
  | UpdateLanguageKeyRequestAction
  | UpdateLanguageKeySuccessAction
  | UpdateLanguageKeyFailureAction;
