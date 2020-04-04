import { Action } from '@ngrx/store';
import { Language, LanguageRequest } from 'src/app/modules/language/language';
import { ErrorResponse } from 'src/app/shared/models/error';
import { PaginationControl } from 'src/app/shared/paginator';

export enum ActionTypes {
  LOAD_REQUEST = '[Language] Load Request',
  LOAD_FAILURE = '[Language] Load Failure',
  LOAD_SUCCESS = '[Language] Load Success',
  GET_LANGUAGE_REQUEST = '[Language] Get Language Request',
  GET_LANGUAGE_SUCCESS = '[Language] Get Language Success',
  GET_LANGUAGE_FAILURE = '[Language] Get Language Failure',
  ADD_LANGUAGE_REQUEST = '[Language] Add Language Request',
  ADD_LANGUAGE_SUCCESS = '[Language] Add Language Success',
  ADD_LANGUAGE_FAILURE = '[Language] Add Language Failure',
  UPDATE_LANGUAGE_REQUEST = '[Language] Update Language Request',
  UPDATE_LANGUAGE_SUCCESS = '[Language] Update Language Success',
  UPDATE_LANGUAGE_FAILURE = '[Language] Update Language Failure',
  DELETE_LANGUAGE_REQUEST = '[Language] Delete Language Request',
  DELETE_LANGUAGE_SUCCESS = '[Language] Delete Language Success',
  DELETE_LANGUAGE_FAILURE = '[Language] Delete Language Failure'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public languageRequest: LanguageRequest = null) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Language[], paginator: PaginationControl }) {}
}

export class GetLanguageRequestAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGE_REQUEST;
  constructor(public id: number) {}
}

export class GetLanguageSuccessAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGE_SUCCESS;
  constructor(public payload: { item: Language }) {}
}

export class GetLanguageFailureAction implements Action {
  readonly type = ActionTypes.GET_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}
export class AddLanguageRequestAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGE_REQUEST;
  constructor(public language: Language) {}
}

export class AddLanguageSuccessAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGE_SUCCESS;
  constructor(public payload: { item: Language }) {}
}

export class AddLanguageFailureAction implements Action {
  readonly type = ActionTypes.ADD_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class UpdateLanguageRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGE_REQUEST;
  constructor(public id: number, public language: Language) {}
}

export class UpdateLanguageSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGE_SUCCESS;
  constructor(public payload: { id: number; item: Language }) {}
}

export class UpdateLanguageFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export class DeleteLanguageRequestAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGE_REQUEST;
  constructor(public id: number) {}
}

export class DeleteLanguageSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGE_SUCCESS;
  constructor(public payload: { id: number; items: Language[] }) {}
}

export class DeleteLanguageFailureAction implements Action {
  readonly type = ActionTypes.DELETE_LANGUAGE_FAILURE;
  constructor(public payload: { error: ErrorResponse }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetLanguageRequestAction
  | GetLanguageSuccessAction
  | GetLanguageFailureAction
  | DeleteLanguageRequestAction
  | DeleteLanguageSuccessAction
  | DeleteLanguageFailureAction
  | AddLanguageRequestAction
  | AddLanguageSuccessAction
  | AddLanguageFailureAction
  | UpdateLanguageRequestAction
  | UpdateLanguageSuccessAction
  | UpdateLanguageFailureAction;
