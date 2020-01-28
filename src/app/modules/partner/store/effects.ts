import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as partnerActions from './actions';
import { PartnerService } from '../partner.service';

@Injectable()
export class PartnerStoreEffects {
  constructor(private partnerService: PartnerService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<partnerActions.LoadRequestAction>(partnerActions.ActionTypes.LOAD_REQUEST),
    startWith(new partnerActions.LoadRequestAction()),
    switchMap(action =>
      this.partnerService.getPartners().pipe(
        map(
          items =>
            new partnerActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new partnerActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getPartnerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<partnerActions.GetPartnerRequestAction>(
      partnerActions.ActionTypes.GET_PARTNER_REQUEST
    ),
    switchMap(action =>
      this.partnerService.getPartner(action.id).pipe(
        map(
          item =>
            new partnerActions.GetPartnerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new partnerActions.GetPartnerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addPartnerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<partnerActions.AddPartnerRequestAction>(
      partnerActions.ActionTypes.ADD_PARTNER_REQUEST
    ),
    switchMap(action =>
      this.partnerService.addPartner(action.partner).pipe(
        map(
          item =>
            new partnerActions.AddPartnerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new partnerActions.AddPartnerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updatePartnerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<partnerActions.UpdatePartnerRequestAction>(
      partnerActions.ActionTypes.UPDATE_PARTNER_REQUEST
    ),
    switchMap(action =>
      this.partnerService.updatePartner(action.id, action.partner).pipe(
        map(
          item =>
            new partnerActions.UpdatePartnerSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(new partnerActions.UpdatePartnerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  deletePartnerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<partnerActions.DeletePartnerRequestAction>(
      partnerActions.ActionTypes.DELETE_PARTNER_REQUEST
    ),
    switchMap(action =>
      this.partnerService.deletePartner(action.id).pipe(
        map(
          items =>
            new partnerActions.DeletePartnerSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(new partnerActions.DeletePartnerFailureAction({ error }))
        )
      )
    )
  );
}
