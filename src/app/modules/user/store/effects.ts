import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user/user.service';
import * as userActions from './actions';

@Injectable()
export class UserStoreEffects {
  constructor(private userService: UserService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadRequestAction>(
      userActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new userActions.LoadRequestAction()),
    switchMap(action =>
      this.userService.getUsers().pipe(
        map(
          items =>
            new userActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new userActions.LoadFailureAction({ error }))
        )
      )
    )
  );
}
