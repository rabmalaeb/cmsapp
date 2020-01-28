import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as languagekeyActions from './actions';
import { LanguageKeyService } from '../languagekey.service';

@Injectable()
export class LanguagekeyStoreEffects {
  constructor(
    private languagekeyService: LanguageKeyService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languagekeyActions.LoadRequestAction>(
      languagekeyActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new languagekeyActions.LoadRequestAction()),
    switchMap(action =>
      this.languagekeyService.getLanguageKeys().pipe(
        map(
          items =>
            new languagekeyActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new languagekeyActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getLanguagekeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languagekeyActions.GetLanguagekeyRequestAction>(
      languagekeyActions.ActionTypes.GET_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languagekeyService.getLanguageKey(action.id).pipe(
        map(
          item =>
            new languagekeyActions.GetLanguagekeySuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new languagekeyActions.GetLanguagekeyFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  addLanguagekeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languagekeyActions.AddLanguagekeyRequestAction>(
      languagekeyActions.ActionTypes.ADD_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languagekeyService.addLanguageKey(action.languagekey).pipe(
        map(
          item =>
            new languagekeyActions.AddLanguagekeySuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new languagekeyActions.AddLanguagekeyFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  updateLanguagekeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languagekeyActions.UpdateLanguagekeyRequestAction>(
      languagekeyActions.ActionTypes.UPDATE_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languagekeyService
        .updateLanguageKey(action.id, action.languagekey)
        .pipe(
          map(
            item =>
              new languagekeyActions.UpdateLanguagekeySuccessAction({
                id: action.id,
                item
              })
          ),
          catchError(error =>
            observableOf(
              new languagekeyActions.UpdateLanguagekeyFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  deleteLanguagekeyEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languagekeyActions.DeleteLanguagekeyRequestAction>(
      languagekeyActions.ActionTypes.DELETE_LANGUAGEKEY_REQUEST
    ),
    switchMap(action =>
      this.languagekeyService.deleteLanguageKey(action.id).pipe(
        map(
          items =>
            new languagekeyActions.DeleteLanguagekeySuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new languagekeyActions.DeleteLanguagekeyFailureAction({ error })
          )
        )
      )
    )
  );
}
