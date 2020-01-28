import { Action } from '@ngrx/store';
import { LanguageKey } from '../languagekey';

export enum ActionTypes {
  LOAD_REQUEST = '[Languagekey] Load Request',
  LOAD_FAILURE = '[Languagekey] Load Failure',
  LOAD_SUCCESS = '[Languagekey] Load Success',
  GET_LANGUAGEKEY_REQUEST = '[Languagekey] Get Languagekey Request',
  GET_LANGUAGEKEY_SUCCESS = '[Languagekey] Get Languagekey Success',
  GET_LANGUAGEKEY_FAILURE = '[Languagekey] Get Languagekey Failure',
  ADD_LANGUAGEKEY_REQUEST = '[Languagekey] Add Languagekey Request',
  ADD_LANGUAGEKEY_SUCCESS = '[Languagekey] Add Languagekey Success',
  ADD_LANGUAGEKEY_FAILURE = '[Languagekey] Add Languagekey Failure',
  UPDATE_LANGUAGEKEY_REQUEST = '[Languagekey] Update Languagekey Request',
  UPDATE_LANGUAGEKEY_SUCCESS = '[Languagekey] Update Languagekey Success',
  UPDATE_LANGUAGEKEY_FAILURE = '[Languagekey] Update Languagekey Failure',
  DELETE_LANGUAGEKEY_REQUEST = '[Languagekey] Delete Languagekey Request',
  DELETE_LANGUAGEKEY_SUCCESS = '[Languagekey] Delete Languagekey Success',
  DELETE_LANGUAGEKEY_FAILURE = '[Languagekey] Delete Languagekey Failure'
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
  constructor(public payload: { items: LanguageKey[] }) {}
}

export class GetLanguagekeyRequestAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGEKEY_REQUEST;
  constructor(public id: number) {}
}

export class GetLanguagekeySuccessAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { item: LanguageKey }) {}
}

export class GetLanguagekeyFailureAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class AddLanguagekeyRequestAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGEKEY_REQUEST;
  constructor(public languagekey: LanguageKey) {}
}

export class AddLanguagekeySuccessAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { item: LanguageKey }) {}
}

export class AddLanguagekeyFailureAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateLanguagekeyRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGEKEY_REQUEST;
  constructor(public id: number, public languagekey: LanguageKey) {}
}

export class UpdateLanguagekeySuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { id: number, item: LanguageKey }) {}
}

export class UpdateLanguagekeyFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DeleteLanguagekeyRequestAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGEKEY_REQUEST;
  constructor(public id: number) {}
}

export class DeleteLanguagekeySuccessAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGEKEY_SUCCESS;
  constructor(public payload: { id: number, items: LanguageKey[] }) {}
}

export class DeleteLanguagekeyFailureAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGEKEY_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetLanguagekeyRequestAction
  | GetLanguagekeySuccessAction
  | GetLanguagekeyFailureAction
  | DeleteLanguagekeyRequestAction
  | DeleteLanguagekeySuccessAction
  | DeleteLanguagekeyFailureAction
  | AddLanguagekeyRequestAction
  | AddLanguagekeySuccessAction
  | AddLanguagekeyFailureAction
  | UpdateLanguagekeyRequestAction
  | UpdateLanguagekeySuccessAction
  | UpdateLanguagekeyFailureAction;
