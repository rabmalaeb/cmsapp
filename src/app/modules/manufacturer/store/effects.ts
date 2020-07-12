import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as languageActions from './actions';
import { ManufacturerService } from '../manufacturer.service';

@Injectable()
export class ManufacturerStoreEffects {
  constructor(
    private manufacturerService: ManufacturerService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.LoadRequestAction>(
      languageActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.getManufacturers(action.languageRequest).pipe(
        map(
          ({ items, paginator }) =>
            new languageActions.LoadSuccessAction({
              items,
              paginator
            })
        ),
        catchError(error =>
          observableOf(new languageActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.GetManufacturerRequestAction>(
      languageActions.ActionTypes.GET_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.getManufacturer(action.id).pipe(
        map(
          item =>
            new languageActions.GetManufacturerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new languageActions.GetManufacturerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.AddManufacturerRequestAction>(
      languageActions.ActionTypes.ADD_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.addManufacturer(action.manufacturer).pipe(
        map(
          item =>
            new languageActions.AddManufacturerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new languageActions.AddManufacturerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.UpdateManufacturerRequestAction>(
      languageActions.ActionTypes.UPDATE_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.updateManufacturer(action.id, action.manufacturer).pipe(
        map(
          item =>
            new languageActions.UpdateManufacturerSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(
            new languageActions.UpdateManufacturerFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  deleteManufacturerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.DeleteManufacturerRequestAction>(
      languageActions.ActionTypes.DELETE_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.manufacturerService.deleteManufacturer(action.id).pipe(
        map(
          items =>
            new languageActions.DeleteManufacturerSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new languageActions.DeleteManufacturerFailureAction({ error })
          )
        )
      )
    )
  );
}
