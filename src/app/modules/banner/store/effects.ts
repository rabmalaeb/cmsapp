import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as bannerActions from './actions';
import { BannerService } from '../banner.service';

@Injectable()
export class BannerStoreEffects {
  constructor(
    private bannerService: BannerService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<bannerActions.LoadRequestAction>(
      bannerActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.bannerService.getBanners().pipe(
        map(
          items =>
            new bannerActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new bannerActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getBannerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<bannerActions.GetBannerRequestAction>(
      bannerActions.ActionTypes.GET_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.bannerService.getBanner(action.id).pipe(
        map(
          item =>
            new bannerActions.GetBannerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new bannerActions.GetBannerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addBannerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<bannerActions.AddBannerRequestAction>(
      bannerActions.ActionTypes.ADD_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.bannerService.addBanner(action.banner).pipe(
        map(
          item =>
            new bannerActions.AddBannerSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new bannerActions.AddBannerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateBannerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<bannerActions.UpdateBannerRequestAction>(
      bannerActions.ActionTypes.UPDATE_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.bannerService.updateBanner(action.id, action.banner).pipe(
        map(
          item =>
            new bannerActions.UpdateBannerSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(new bannerActions.UpdateBannerFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  deleteBannerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<bannerActions.DeleteBannerRequestAction>(
      bannerActions.ActionTypes.DELETE_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.bannerService.deleteBanner(action.id).pipe(
        map(
          items =>
            new bannerActions.DeleteBannerSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(new bannerActions.DeleteBannerFailureAction({ error }))
        )
      )
    )
  );
}
