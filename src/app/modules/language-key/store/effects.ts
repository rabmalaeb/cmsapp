import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as languageKeyActions from './actions';
import { LanguageKeyService } from '../language-key.service';

@Injectable()
export class LanguageKeyStoreEffects {
  constructor(
    private languageKeyService: LanguageKeyService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageKeyActions.LoadRequestAction>(
      languageKeyActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.languageKeyService.getLanguageKeys(action.languageKeyRequest).pipe(
        map(
          ({ items, paginator }) =>
            new languageKeyActions.LoadSuccessAction({
              items,
              paginator
            })
        ),
        catchError(error =>
          observableOf(new languageKeyActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getLanguageKeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageKeyActions.GetLanguageKeyRequestAction>(
      languageKeyActions.ActionTypes.GET_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languageKeyService.getLanguageKey(action.id).pipe(
        map(
          item =>
            new languageKeyActions.GetLanguageKeySuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new languageKeyActions.GetLanguageKeyFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  addLanguageKeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageKeyActions.AddLanguageKeyRequestAction>(
      languageKeyActions.ActionTypes.ADD_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languageKeyService.addLanguageKey(action.languageKey).pipe(
        map(
          item =>
            new languageKeyActions.AddLanguageKeySuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new languageKeyActions.AddLanguageKeyFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  updateLanguageKeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageKeyActions.UpdateLanguageKeyRequestAction>(
      languageKeyActions.ActionTypes.UPDATE_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languageKeyService
        .updateLanguageKey(action.id, action.languageKey)
        .pipe(
          map(
            item =>
              new languageKeyActions.UpdateLanguageKeySuccessAction({
                id: action.id,
                item
              })
          ),
          catchError(error =>
            observableOf(
              new languageKeyActions.UpdateLanguageKeyFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  deleteLanguageKeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageKeyActions.DeleteLanguageKeyRequestAction>(
      languageKeyActions.ActionTypes.DELETE_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languageKeyService.deleteLanguageKey(action.id).pipe(
        map(
          items =>
            new languageKeyActions.DeleteLanguageKeySuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new languageKeyActions.DeleteLanguageKeyFailureAction({ error })
          )
        )
      )
    )
  );
}
