import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as languageActions from './actions';
import { LanguageService } from '../language.service';

@Injectable()
export class LanguageStoreEffects {
  constructor(
    private languageService: LanguageService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.LoadRequestAction>(
      languageActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.languageService.getLanguages(action.languageRequest).pipe(
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
  getLanguageEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.GetLanguageRequestAction>(
      languageActions.ActionTypes.GET_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.languageService.getLanguage(action.id).pipe(
        map(
          item =>
            new languageActions.GetLanguageSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new languageActions.GetLanguageFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addLanguageEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.AddLanguageRequestAction>(
      languageActions.ActionTypes.ADD_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.languageService.addLanguage(action.language).pipe(
        map(
          item =>
            new languageActions.AddLanguageSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new languageActions.AddLanguageFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateLanguageEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.UpdateLanguageRequestAction>(
      languageActions.ActionTypes.UPDATE_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.languageService.updateLanguage(action.id, action.language).pipe(
        map(
          item =>
            new languageActions.UpdateLanguageSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(
            new languageActions.UpdateLanguageFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  deleteLanguageEffect$: Observable<Action> = this.actions$.pipe(
    ofType<languageActions.DeleteLanguageRequestAction>(
      languageActions.ActionTypes.DELETE_LANGUAGE_REQUEST
    ),
    switchMap(action =>
      this.languageService.deleteLanguage(action.id).pipe(
        map(
          items =>
            new languageActions.DeleteLanguageSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new languageActions.DeleteLanguageFailureAction({ error })
          )
        )
      )
    )
  );
}
