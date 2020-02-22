import { Action } from '@ngrx/store';
import { Media } from 'src/app/modules/media/media';
import { ErrorResponse } from 'src/app/models/general';

export enum ActionTypes {
  LOAD_REQUEST = '[Media] Load Request',
  LOAD_FAILURE = '[Media] Load Failure',
  LOAD_SUCCESS = '[Media] Load Success',
  GET_MEDIA_REQUEST = '[Media] Get Media Request',
  GET_MEDIA_SUCCESS = '[Media] Get Media Success',
  GET_MEDIA_FAILURE = '[Media] Get Media Failure',
  ADD_MEDIA_REQUEST = '[Media] Add Media Request',
  ADD_MEDIA_SUCCESS = '[Media] Add Media Success',
  ADD_MEDIA_FAILURE = '[Media] Add Media Failure',
  UPDATE_MEDIA_REQUEST = '[Media] Update Media Request',
  UPDATE_MEDIA_SUCCESS = '[Media] Update Media Success',
  UPDATE_MEDIA_FAILURE = '[Media] Update Media Failure',
  DELETE_MEDIA_REQUEST = '[Media] Delete Media Request',
  DELETE_MEDIA_SUCCESS = '[Media] Delete Media Success',
  DELETE_MEDIA_FAILURE = '[Media] Delete Media Failure'
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
  constructor(public payload: { items: Media[] }) {}
}

export class GetMediaRequestAction implements Action {
  readonly type = ActionTypes.GET_MEDIA_REQUEST;
  constructor(public id: number) {}
}

export class GetMediaSuccessAction implements Action {
  readonly type = ActionTypes.GET_MEDIA_SUCCESS;
  constructor(public payload: { item: Media }) {}
}

export class GetMediaFailureAction implements Action {
  readonly type = ActionTypes.GET_MEDIA_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}
export class AddMediaRequestAction implements Action {
  readonly type = ActionTypes.ADD_MEDIA_REQUEST;
  constructor(public formData: FormData) {}
}

export class AddMediaSuccessAction implements Action {
  readonly type = ActionTypes.ADD_MEDIA_SUCCESS;
  constructor(public payload: { item: Media }) {}
}

export class AddMediaFailureAction implements Action {
  readonly type = ActionTypes.ADD_MEDIA_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class UpdateMediaRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_MEDIA_REQUEST;
  constructor(public id: number, public media: Media) {}
}

export class UpdateMediaSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_MEDIA_SUCCESS;
  constructor(public payload: { id: number; item: Media }) {}
}

export class UpdateMediaFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_MEDIA_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class DeleteMediaRequestAction implements Action {
  readonly type = ActionTypes.DELETE_MEDIA_REQUEST;
  constructor(public id: number) {}
}

export class DeleteMediaSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_MEDIA_SUCCESS;
  constructor(public payload: { id: number; items: Media[] }) {}
}

export class DeleteMediaFailureAction implements Action {
  readonly type = ActionTypes.DELETE_MEDIA_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetMediaRequestAction
  | GetMediaSuccessAction
  | GetMediaFailureAction
  | DeleteMediaRequestAction
  | DeleteMediaSuccessAction
  | DeleteMediaFailureAction
  | AddMediaRequestAction
  | AddMediaSuccessAction
  | AddMediaFailureAction
  | UpdateMediaRequestAction
  | UpdateMediaSuccessAction
  | UpdateMediaFailureAction;
