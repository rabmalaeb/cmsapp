import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as adminActions from './actions';
import { AdminService } from '../admin.service';

@Injectable()
export class AdminStoreEffects {
  constructor(private adminService: AdminService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<adminActions.LoadRequestAction>(
      adminActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new adminActions.LoadRequestAction()),
    switchMap(action =>
      this.adminService.getAdmins().pipe(
        map(
          items =>
            new adminActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new adminActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getAdminEffect$: Observable<Action> = this.actions$.pipe(
    ofType<adminActions.GetAdminRequestAction>(
      adminActions.ActionTypes.GET_ADMIN_REQUEST
    ),
    switchMap(action =>
      this.adminService.getAdmin(action.id).pipe(
        map(
          item =>
            new adminActions.GetAdminSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new adminActions.GetAdminFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addAdminEffect$: Observable<Action> = this.actions$.pipe(
    ofType<adminActions.AddAdminRequestAction>(
      adminActions.ActionTypes.ADD_ADMIN_REQUEST
    ),
    switchMap(action =>
      this.adminService.addAdmin(action.admin).pipe(
        map(
          item =>
            new adminActions.AddAdminSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new adminActions.AddAdminFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateAdminEffect$: Observable<Action> = this.actions$.pipe(
    ofType<adminActions.UpdateAdminRequestAction>(
      adminActions.ActionTypes.UPDATE_ADMIN_REQUEST
    ),
    switchMap(action =>
      this.adminService.updateAdmin(action.id, action.admin).pipe(
        map(
          item =>
            new adminActions.UpdateAdminSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(new adminActions.UpdateAdminFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  deleteAdminEffect$: Observable<Action> = this.actions$.pipe(
    ofType<adminActions.DeleteAdminRequestAction>(
      adminActions.ActionTypes.DELETE_ADMIN_REQUEST
    ),
    switchMap(action =>
      this.adminService.deleteAdmin(action.id).pipe(
        map(
          items =>
            new adminActions.DeleteAdminSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(new adminActions.DeleteAdminFailureAction({ error }))
        )
      )
    )
  );
}
