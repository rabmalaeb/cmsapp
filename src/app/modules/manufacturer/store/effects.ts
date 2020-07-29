import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as manufacturerActions from './actions';
import { ManufacturerService } from '../manufacturer.service';

@Injectable()
export class ManufacturerStoreEffects {
  constructor(
    private manufacturerService: ManufacturerService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<manufacturerActions.LoadRequestAction>(
      manufacturerActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.getManufacturers(action.manufacturerRequest).pipe(
        map(
          ({ items, paginator }) =>
            new manufacturerActions.LoadSuccessAction({
              items,
              paginator
            })
        ),
        catchError(error =>
          observableOf(new manufacturerActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<manufacturerActions.GetManufacturerRequestAction>(
      manufacturerActions.ActionTypes.GET_MANUFACTURER_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.getManufacturer(action.id).pipe(
        map(
          item =>
            new manufacturerActions.GetManufacturerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new manufacturerActions.GetManufacturerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<manufacturerActions.AddManufacturerRequestAction>(
      manufacturerActions.ActionTypes.ADD_MANUFACTURER_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.addManufacturer(action.manufacturer).pipe(
        map(
          item =>
            new manufacturerActions.AddManufacturerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new manufacturerActions.AddManufacturerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<manufacturerActions.UpdateManufacturerRequestAction>(
      manufacturerActions.ActionTypes.UPDATE_MANUFACTURER_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.updateManufacturer(action.id, action.manufacturer).pipe(
        map(
          item =>
            new manufacturerActions.UpdateManufacturerSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(
            new manufacturerActions.UpdateManufacturerFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  deleteManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<manufacturerActions.DeleteManufacturerRequestAction>(
      manufacturerActions.ActionTypes.DELETE_MANUFACTURER_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.deleteManufacturer(action.id).pipe(
        map(
          items =>
            new manufacturerActions.DeleteManufacturerSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new manufacturerActions.DeleteManufacturerFailureAction({ error })
          )
        )
      )
    )
  );
}
