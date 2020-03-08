import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as translationActions from './actions';
import { TranslationService } from '../translation.service';

@Injectable()
export class TranslationStoreEffects {
  constructor(
    private translationService: TranslationService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<translationActions.LoadRequestAction>(
      translationActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.translationService.getTranslations(action.translationRequest).pipe(
        map(
          items =>
            new translationActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new translationActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getTranslationEffect$: Observable<Action> = this.actions$.pipe(
    ofType<translationActions.GetTranslationRequestAction>(
      translationActions.ActionTypes.GET_TRANSLATION_REQUEST
    ),
    switchMap(action =>
      this.translationService.getTranslation(action.id).pipe(
        map(
          item =>
            new translationActions.GetTranslationSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new translationActions.GetTranslationFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  addTranslationEffect$: Observable<Action> = this.actions$.pipe(
    ofType<translationActions.AddTranslationRequestAction>(
      translationActions.ActionTypes.ADD_TRANSLATION_REQUEST
    ),
    switchMap(action =>
      this.translationService.addTranslation(action.translation).pipe(
        map(
          item =>
            new translationActions.AddTranslationSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new translationActions.AddTranslationFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  updateTranslationEffect$: Observable<Action> = this.actions$.pipe(
    ofType<translationActions.UpdateTranslationRequestAction>(
      translationActions.ActionTypes.UPDATE_TRANSLATION_REQUEST
    ),
    switchMap(action =>
      this.translationService
        .updateTranslation(action.id, action.translation)
        .pipe(
          map(
            item =>
              new translationActions.UpdateTranslationSuccessAction({
                id: action.id,
                item
              })
          ),
          catchError(error =>
            observableOf(
              new translationActions.UpdateTranslationFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  deleteTranslationEffect$: Observable<Action> = this.actions$.pipe(
    ofType<translationActions.DeleteTranslationRequestAction>(
      translationActions.ActionTypes.DELETE_TRANSLATION_REQUEST
    ),
    switchMap(action =>
      this.translationService.deleteTranslation(action.id).pipe(
        map(
          items =>
            new translationActions.DeleteTranslationSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new translationActions.DeleteTranslationFailureAction({ error })
          )
        )
      )
    )
  );
}
