import { Action } from '@ngrx/store';
import { Partner } from 'src/app/modules/partner/partner';

export enum ActionTypes {
  LOAD_REQUEST = '[Partner] Load Request',
  LOAD_FAILURE = '[Partner] Load Failure',
  LOAD_SUCCESS = '[Partner] Load Success',
  GET_PARTNER_REQUEST = '[Partner] Get Partner Request',
  GET_PARTNER_SUCCESS = '[Partner] Get Partner Success',
  GET_PARTNER_FAILURE = '[Partner] Get Partner Failure',
  ADD_PARTNER_REQUEST = '[Partner] Add Partner Request',
  ADD_PARTNER_SUCCESS = '[Partner] Add Partner Success',
  ADD_PARTNER_FAILURE = '[Partner] Add Partner Failure',
  UPDATE_PARTNER_REQUEST = '[Partner] Update Partner Request',
  UPDATE_PARTNER_SUCCESS = '[Partner] Update Partner Success',
  UPDATE_PARTNER_FAILURE = '[Partner] Update Partner Failure',
  DELETE_PARTNER_REQUEST = '[Partner] Delete Partner Request',
  DELETE_PARTNER_SUCCESS = '[Partner] Delete Partner Success',
  DELETE_PARTNER_FAILURE = '[Partner] Delete Partner Failure'
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
  constructor(public payload: { items: Partner[] }) {}
}

export class GetPartnerRequestAction implements Action {
  readonly type = ActionTypes.GET_PARTNER_REQUEST;
  constructor(public id: number) {}
}

export class GetPartnerSuccessAction implements Action {
  readonly type = ActionTypes.GET_PARTNER_SUCCESS;
  constructor(public payload: { item: Partner }) {}
}

export class GetPartnerFailureAction implements Action {
  readonly type = ActionTypes.GET_PARTNER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}
export class AddPartnerRequestAction implements Action {
  readonly type = ActionTypes.ADD_PARTNER_REQUEST;
  constructor(public partner: Partner) {}
}

export class AddPartnerSuccessAction implements Action {
  readonly type = ActionTypes.ADD_PARTNER_SUCCESS;
  constructor(public payload: { item: Partner }) {}
}

export class AddPartnerFailureAction implements Action {
  readonly type = ActionTypes.ADD_PARTNER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class UpdatePartnerRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_PARTNER_REQUEST;
  constructor(public id: number, public partner: Partner) {}
}

export class UpdatePartnerSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_PARTNER_SUCCESS;
  constructor(public payload: { id: number; item: Partner }) {}
}

export class UpdatePartnerFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_PARTNER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export class DeletePartnerRequestAction implements Action {
  readonly type = ActionTypes.DELETE_PARTNER_REQUEST;
  constructor(public id: number) {}
}

export class DeletePartnerSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_PARTNER_SUCCESS;
  constructor(public payload: { id: number; items: Partner[] }) {}
}

export class DeletePartnerFailureAction implements Action {
  readonly type = ActionTypes.DELETE_PARTNER_FAILURE;
  constructor(public payload: { error: ErrorResponse }) { }
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | GetPartnerRequestAction
  | GetPartnerSuccessAction
  | GetPartnerFailureAction
  | DeletePartnerRequestAction
  | DeletePartnerSuccessAction
  | DeletePartnerFailureAction
  | AddPartnerRequestAction
  | AddPartnerSuccessAction
  | AddPartnerFailureAction
  | UpdatePartnerRequestAction
  | UpdatePartnerSuccessAction
  | UpdatePartnerFailureAction;
