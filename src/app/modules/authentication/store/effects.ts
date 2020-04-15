import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as LoginActions from './actions';
import { LoginService } from '../login/login.service';

@Injectable()
export class LoginStoreEffects {
  constructor(private loginService: LoginService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<LoginActions.LoadRequestAction>(
      LoginActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.loginService.login(action.loginRequest).pipe(
        map(
          item =>
            new LoginActions.LoadSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new LoginActions.LoadFailureAction({ error }))
        )
      )
    )
  );
}
