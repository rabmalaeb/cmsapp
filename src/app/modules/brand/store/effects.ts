import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as brandActions from './actions';
import { BrandService } from '../brand.service';

@Injectable()
export class BrandStoreEffects {
  constructor(
    private brandService: BrandService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<brandActions.LoadRequestAction>(
      brandActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.brandService.getBrands(action.brandRequest).pipe(
        map(
          ({ items, paginator }) =>
            new brandActions.LoadSuccessAction({
              items,
              paginator
            })
        ),
        catchError(error =>
          observableOf(new brandActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getBrandEffect$: Observable<Action> = this.actions$.pipe(
    ofType<brandActions.GetBrandRequestAction>(
      brandActions.ActionTypes.GET_BRAND_REQUEST
    ),
    switchMap(action =>
      this.brandService.getBrand(action.id).pipe(
        map(
          item =>
            new brandActions.GetBrandSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new brandActions.GetBrandFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addBrandEffect$: Observable<Action> = this.actions$.pipe(
    ofType<brandActions.AddBrandRequestAction>(
      brandActions.ActionTypes.ADD_BRAND_REQUEST
    ),
    switchMap(action =>
      this.brandService.addBrand(action.brand).pipe(
        map(
          item =>
            new brandActions.AddBrandSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new brandActions.AddBrandFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateBrandEffect$: Observable<Action> = this.actions$.pipe(
    ofType<brandActions.UpdateBrandRequestAction>(
      brandActions.ActionTypes.UPDATE_BRAND_REQUEST
    ),
    switchMap(action =>
      this.brandService.updateBrand(action.id, action.brand).pipe(
        map(
          item =>
            new brandActions.UpdateBrandSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(
            new brandActions.UpdateBrandFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  deleteBrandEffect$: Observable<Action> = this.actions$.pipe(
    ofType<brandActions.DeleteBrandRequestAction>(
      brandActions.ActionTypes.DELETE_BRAND_REQUEST
    ),
    switchMap(action =>
      this.brandService.deleteBrand(action.id).pipe(
        map(
          items =>
            new brandActions.DeleteBrandSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new brandActions.DeleteBrandFailureAction({ error })
          )
        )
      )
    )
  );
}
