import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as permissionActions from './actions';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionStoreEffects {
  constructor(
    private permissionService: PermissionService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<permissionActions.LoadRequestAction>(
      permissionActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.permissionService.getPermissions(action.permissionRequest).pipe(
        map(
          ({ items, paginator }) =>
            new permissionActions.LoadSuccessAction({
              items,
              paginator
            })
        ),
        catchError(error =>
          observableOf(new permissionActions.LoadFailureAction({ error }))
        )
      )
    )
  );
  @Effect()
  loadPermissionsByRoleEffect$: Observable<Action> = this.actions$.pipe(
    ofType<permissionActions.LoadPermissionsByRoleAction>(
      permissionActions.ActionTypes.LOAD_PERMISSIONS_BY_ROLE_REQUEST
    ),

    switchMap(action =>
      this.permissionService.getPermissionByRoleId(action.id).pipe(
        map(
          items =>
            new permissionActions.LoadRolePermissionSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(
            new permissionActions.LoadRolePermissionFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  getPermissionEffect$: Observable<Action> = this.actions$.pipe(
    ofType<permissionActions.GetPermissionRequestAction>(
      permissionActions.ActionTypes.GET_PERMISSION_REQUEST
    ),
    switchMap(action =>
      this.permissionService.getPermission(action.id).pipe(
        map(
          item =>
            new permissionActions.GetPermissionSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new permissionActions.GetPermissionFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  addPermissionEffect$: Observable<Action> = this.actions$.pipe(
    ofType<permissionActions.AddPermissionRequestAction>(
      permissionActions.ActionTypes.ADD_PERMISSION_REQUEST
    ),
    switchMap(action =>
      this.permissionService.addPermission(action.permission).pipe(
        map(
          item =>
            new permissionActions.AddPermissionSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new permissionActions.AddPermissionFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  updatePermissionEffect$: Observable<Action> = this.actions$.pipe(
    ofType<permissionActions.UpdatePermissionRequestAction>(
      permissionActions.ActionTypes.UPDATE_PERMISSION_REQUEST
    ),
    switchMap(action =>
      this.permissionService
        .updatePermission(action.id, action.permission)
        .pipe(
          map(
            item =>
              new permissionActions.UpdatePermissionSuccessAction({
                id: action.id,
                item
              })
          ),
          catchError(error =>
            observableOf(
              new permissionActions.UpdatePermissionFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  deletePermissionEffect$: Observable<Action> = this.actions$.pipe(
    ofType<permissionActions.DeletePermissionRequestAction>(
      permissionActions.ActionTypes.DELETE_PERMISSION_REQUEST
    ),
    switchMap(action =>
      this.permissionService.deletePermission(action.id).pipe(
        map(
          items =>
            new permissionActions.DeletePermissionSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new permissionActions.DeletePermissionFailureAction({ error })
          )
        )
      )
    )
  );
}
