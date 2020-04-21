import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AuthenticationActions from './actions';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable()
export class AuthenticationStoreEffects {
  constructor(
    private authenticationService: AuthenticationService,
    private actions$: Actions
  ) {}

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthenticationActions.LoginRequestAction>(
      AuthenticationActions.ActionTypes.LOGIN_REQUEST
    ),
    switchMap(action =>
      this.authenticationService.login(action.loginRequest).pipe(
        map(
          item =>
            new AuthenticationActions.LoginSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new AuthenticationActions.LoginFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  resetPasswordRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthenticationActions.ResetPasswordRequestAction>(
      AuthenticationActions.ActionTypes.RESET_PASSWORD_REQUEST
    ),
    switchMap(action =>
      this.authenticationService
        .resetPassword(action.resetPasswordRequest)
        .pipe(
          map(
            message =>
              new AuthenticationActions.ResetPasswordSuccessAction({
                message
              })
          ),
          catchError(error =>
            observableOf(
              new AuthenticationActions.ResetPasswordFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  setPasswordRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthenticationActions.SetPasswordRequestAction>(
      AuthenticationActions.ActionTypes.SET_PASSWORD_REQUEST
    ),
    switchMap(action =>
      this.authenticationService.setPassword(action.setPasswordRequest).pipe(
        map(
          item =>
            new AuthenticationActions.SetPasswordSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new AuthenticationActions.SetPasswordFailureAction({ error })
          )
        )
      )
    )
  );
}
