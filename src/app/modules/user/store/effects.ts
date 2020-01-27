import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as userActions from './actions';
import { UserService } from '../user.service';

@Injectable()
export class UserStoreEffects {
  constructor(private userService: UserService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadRequestAction>(userActions.ActionTypes.LOAD_REQUEST),
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

  @Effect()
  getUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.GetUserRequestAction>(
      userActions.ActionTypes.GET_USER_REQUEST
    ),
    switchMap(action =>
      this.userService.getUser(action.id).pipe(
        map(
          item =>
            new userActions.GetUserSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new userActions.GetUserFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.AddUserRequestAction>(
      userActions.ActionTypes.ADD_USER_REQUEST
    ),
    switchMap(action =>
      this.userService.addUser(action.user).pipe(
        map(
          item =>
            new userActions.AddUserSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new userActions.AddUserFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UpdateUserRequestAction>(
      userActions.ActionTypes.UPDATE_USER_REQUEST
    ),
    switchMap(action =>
      this.userService.updateUser(action.id, action.user).pipe(
        map(
          item =>
            new userActions.UpdateUserSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(new userActions.UpdateUserFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  deleteUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.DeleteUserRequestAction>(
      userActions.ActionTypes.DELETE_USER_REQUEST
    ),
    switchMap(action =>
      this.userService.deleteUser(action.id).pipe(
        map(
          items =>
            new userActions.DeleteUserSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(new userActions.DeleteUserFailureAction({ error }))
        )
      )
    )
  );
}
