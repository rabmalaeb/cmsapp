import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as countryActions from './actions';
import { CountryService } from '../country.service';

@Injectable()
export class CountryStoreEffects {
  constructor(
    private countryService: CountryService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<countryActions.LoadRequestAction>(
      countryActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.countryService.getCountries().pipe(
        map(
          countries =>
            new countryActions.LoadSuccessAction({
              items: countries
            })
        ),
        catchError(error =>
          observableOf(new countryActions.LoadFailureAction({ error }))
        )
      )
    )
  );
}
