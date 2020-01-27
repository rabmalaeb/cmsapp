import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as roleActions from './actions';
import { RoleService } from '../role.service';

@Injectable()
export class RoleStoreEffects {
  constructor(private roleService: RoleService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<roleActions.LoadRequestAction>(roleActions.ActionTypes.LOAD_REQUEST),
    startWith(new roleActions.LoadRequestAction()),
    switchMap(action =>
      this.roleService.getRoles().pipe(
        map(
          items =>
            new roleActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new roleActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getRoleEffect$: Observable<Action> = this.actions$.pipe(
    ofType<roleActions.GetRoleRequestAction>(
      roleActions.ActionTypes.GET_ROLE_REQUEST
    ),
    switchMap(action =>
      this.roleService.getRole(action.id).pipe(
        map(
          item =>
            new roleActions.GetRoleSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new roleActions.GetRoleFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addRoleEffect$: Observable<Action> = this.actions$.pipe(
    ofType<roleActions.AddRoleRequestAction>(
      roleActions.ActionTypes.ADD_ROLE_REQUEST
    ),
    switchMap(action =>
      this.roleService.addRole(action.role).pipe(
        map(
          item =>
            new roleActions.AddRoleSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new roleActions.AddRoleFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateRoleEffect$: Observable<Action> = this.actions$.pipe(
    ofType<roleActions.UpdateRoleRequestAction>(
      roleActions.ActionTypes.UPDATE_ROLE_REQUEST
    ),
    switchMap(action =>
      this.roleService.updateRole(action.id, action.role).pipe(
        map(
          item =>
            new roleActions.UpdateRoleSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(new roleActions.UpdateRoleFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  deleteRoleEffect$: Observable<Action> = this.actions$.pipe(
    ofType<roleActions.DeleteRoleRequestAction>(
      roleActions.ActionTypes.DELETE_ROLE_REQUEST
    ),
    switchMap(action =>
      this.roleService.deleteRole(action.id).pipe(
        map(
          items =>
            new roleActions.DeleteRoleSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(new roleActions.DeleteRoleFailureAction({ error }))
        )
      )
    )
  );
}
