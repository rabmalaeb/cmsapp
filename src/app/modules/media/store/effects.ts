import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as mediaActions from './actions';
import { MediaService } from '../media.service';

@Injectable()
export class MediaStoreEffects {
  constructor(
    private mediaService: MediaService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<mediaActions.LoadRequestAction>(
      mediaActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.mediaService.getMedias().pipe(
        map(
          items =>
            new mediaActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new mediaActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getMediaEffect$: Observable<Action> = this.actions$.pipe(
    ofType<mediaActions.GetMediaRequestAction>(
      mediaActions.ActionTypes.GET_MEDIA_REQUEST
    ),
    switchMap(action =>
      this.mediaService.getMedia(action.id).pipe(
        map(
          item =>
            new mediaActions.GetMediaSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new mediaActions.GetMediaFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addMediaEffect$: Observable<Action> = this.actions$.pipe(
    ofType<mediaActions.AddMediaRequestAction>(
      mediaActions.ActionTypes.ADD_MEDIA_REQUEST
    ),
    switchMap(action =>
      this.mediaService.addMedia(action.formData).pipe(
        map(
          item =>
            new mediaActions.AddMediaSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new mediaActions.AddMediaFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateMediaEffect$: Observable<Action> = this.actions$.pipe(
    ofType<mediaActions.UpdateMediaRequestAction>(
      mediaActions.ActionTypes.UPDATE_MEDIA_REQUEST
    ),
    switchMap(action =>
      this.mediaService.updateMedia(action.id, action.media).pipe(
        map(
          item =>
            new mediaActions.UpdateMediaSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(
            new mediaActions.UpdateMediaFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  deleteMediaEffect$: Observable<Action> = this.actions$.pipe(
    ofType<mediaActions.DeleteMediaRequestAction>(
      mediaActions.ActionTypes.DELETE_MEDIA_REQUEST
    ),
    switchMap(action =>
      this.mediaService.deleteMedia(action.id).pipe(
        map(
          items =>
            new mediaActions.DeleteMediaSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new mediaActions.DeleteMediaFailureAction({ error })
          )
        )
      )
    )
  );
}
