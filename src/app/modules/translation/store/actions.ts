import { Action } from '@ngrx/store';
import { Translation } from 'src/app/modules/translation/translation';

export enum ActionTypes {
  LOAD_REQUEST = '[Translation] Load Request',
  LOAD_FAILURE = '[Translation] Load Failure',
  LOAD_SUCCESS = '[Translation] Load Success',
  GET_TRANSLATION_REQUEST = '[Translation] Get Translation Request',
  GET_TRANSLATION_SUCCESS = '[Translation] Get Translation Success',
  GET_TRANSLATION_FAILURE = '[Translation] Get Translation Failure',
  ADD_TRANSLATION_REQUEST = '[Translation] Add Translation Request',
  ADD_TRANSLATION_SUCCESS = '[Translation] Add Translation Success',
  ADD_TRANSLATION_FAILURE = '[Translation] Add Translation Failure',
  UPDATE_TRANSLATION_REQUEST = '[Translation] Update Translation Request',
  UPDATE_TRANSLATION_SUCCESS = '[Translation] Update Translation Success',
  UPDATE_TRANSLATION_FAILURE = '[Translation] Update Translation Failure',
  DELETE_TRANSLATION_REQUEST = '[Translation] Delete Translation Request',
  DELETE_TRANSLATION_SUCCESS = '[Translation] Delete Translation Success',
  DELETE_TRANSLATION_FAILURE = '[Translation] Delete Translation Failure'
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
  constructor(public payload: { items: Translation[] }) {}
}

export class GetTranslationRequestAction implements Action {
  readonly type = ActionTypes.GET_TRANSLATION_REQUEST;
  constructor(public id: number) {}
}

export class GetTranslationSuccessAction implements Action {
  readonly type = ActionTypes.GET_TRANSLATION_SUCCESS;
  constructor(public payload: { item: Translation }) {}
}

export class GetTranslationFailureAction implements Action {
  readonly type = ActionTypes.GET_TRANSLATION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}
export class AddTranslationRequestAction implements Action {
  readonly type = ActionTypes.ADD_TRANSLATION_REQUEST;
  constructor(public translation: Translation) {}
}

export class AddTranslationSuccessAction implements Action {
  readonly type = ActionTypes.ADD_TRANSLATION_SUCCESS;
  constructor(public payload: { item: Translation }) {}
}

export class AddTranslationFailureAction implements Action {
  readonly type = ActionTypes.ADD_TRANSLATION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class UpdateTranslationRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_TRANSLATION_REQUEST;
  constructor(public id: number, public translation: Translation) {}
}

export class UpdateTranslationSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_TRANSLATION_SUCCESS;
  constructor(public payload: { id: number, item: Translation }) {}
}

export class UpdateTranslationFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_TRANSLATION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class DeleteTranslationRequestAction implements Action {
  readonly type = ActionTypes.DELETE_TRANSLATION_REQUEST;
  constructor(public id: number) {}
}

export class DeleteTranslationSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_TRANSLATION_SUCCESS;
  constructor(public payload: { id: number, items: Translation[] }) {}
}

export class DeleteTranslationFailureAction implements Action {
  readonly type = ActionTypes.DELETE_TRANSLATION_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetTranslationRequestAction
  | GetTranslationSuccessAction
  | GetTranslationFailureAction
  | DeleteTranslationRequestAction
  | DeleteTranslationSuccessAction
  | DeleteTranslationFailureAction
  | AddTranslationRequestAction
  | AddTranslationSuccessAction
  | AddTranslationFailureAction
  | UpdateTranslationRequestAction
  | UpdateTranslationSuccessAction
  | UpdateTranslationFailureAction;
