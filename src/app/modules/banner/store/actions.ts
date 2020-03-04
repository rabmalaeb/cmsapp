import { Action } from '@ngrx/store';
import { Banner } from 'src/app/modules/banner/banner';
import { ErrorResponse } from 'src/app/shared/models/general';

export enum ActionTypes {
  LOAD_REQUEST = '[Banner] Load Request',
  LOAD_FAILURE = '[Banner] Load Failure',
  LOAD_SUCCESS = '[Banner] Load Success',
  GET_PRODUCT_REQUEST = '[Banner] Get Banner Request',
  GET_PRODUCT_SUCCESS = '[Banner] Get Banner Success',
  GET_PRODUCT_FAILURE = '[Banner] Get Banner Failure',
  ADD_PRODUCT_REQUEST = '[Banner] Add Banner Request',
  ADD_PRODUCT_SUCCESS = '[Banner] Add Banner Success',
  ADD_PRODUCT_FAILURE = '[Banner] Add Banner Failure',
  UPDATE_PRODUCT_REQUEST = '[Banner] Update Banner Request',
  UPDATE_PRODUCT_SUCCESS = '[Banner] Update Banner Success',
  UPDATE_PRODUCT_FAILURE = '[Banner] Update Banner Failure',
  DELETE_PRODUCT_REQUEST = '[Banner] Delete Banner Request',
  DELETE_PRODUCT_SUCCESS = '[Banner] Delete Banner Success',
  DELETE_PRODUCT_FAILURE = '[Banner] Delete Banner Failure'
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
  constructor(public payload: { items: Banner[] }) {}
}

export class GetBannerRequestAction implements Action {
  readonly type = ActionTypes.GET_PRODUCT_REQUEST;
  constructor(public id: number) {}
}

export class GetBannerSuccessAction implements Action {
  readonly type = ActionTypes.GET_PRODUCT_SUCCESS;
  constructor(public payload: { item: Banner }) {}
}

export class GetBannerFailureAction implements Action {
  readonly type = ActionTypes.GET_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}
export class AddBannerRequestAction implements Action {
  readonly type = ActionTypes.ADD_PRODUCT_REQUEST;
  constructor(public banner: Banner) {}
}

export class AddBannerSuccessAction implements Action {
  readonly type = ActionTypes.ADD_PRODUCT_SUCCESS;
  constructor(public payload: { item: Banner }) {}
}

export class AddBannerFailureAction implements Action {
  readonly type = ActionTypes.ADD_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class UpdateBannerRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT_REQUEST;
  constructor(public id: number, public banner: Banner) {}
}

export class UpdateBannerSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: { id: number; item: Banner }) {}
}

export class UpdateBannerFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class DeleteBannerRequestAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_REQUEST;
  constructor(public id: number) {}
}

export class DeleteBannerSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public payload: { id: number; items: Banner[] }) {}
}

export class DeleteBannerFailureAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetBannerRequestAction
  | GetBannerSuccessAction
  | GetBannerFailureAction
  | DeleteBannerRequestAction
  | DeleteBannerSuccessAction
  | DeleteBannerFailureAction
  | AddBannerRequestAction
  | AddBannerSuccessAction
  | AddBannerFailureAction
  | UpdateBannerRequestAction
  | UpdateBannerSuccessAction
  | UpdateBannerFailureAction;
