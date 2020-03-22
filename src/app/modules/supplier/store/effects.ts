import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as supplierActions from './actions';
import { SupplierService } from '../supplier.service';

@Injectable()
export class SupplierStoreEffects {
  constructor(
    private supplierService: SupplierService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<supplierActions.LoadRequestAction>(
      supplierActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.supplierService.getSuppliers(action.supplierRequest).pipe(
        map(
          ({ items, paginator }) =>
            new supplierActions.LoadSuccessAction({
              items,
              paginator
            })
        ),
        catchError(error =>
          observableOf(new supplierActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getSupplierEffect$: Observable<Action> = this.actions$.pipe(
    ofType<supplierActions.GetSupplierRequestAction>(
      supplierActions.ActionTypes.GET_SUPPLIER_REQUEST
    ),
    switchMap(action =>
      this.supplierService.getSupplier(action.id).pipe(
        map(
          item =>
            new supplierActions.GetSupplierSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new supplierActions.GetSupplierFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addSupplierEffect$: Observable<Action> = this.actions$.pipe(
    ofType<supplierActions.AddSupplierRequestAction>(
      supplierActions.ActionTypes.ADD_SUPPLIER_REQUEST
    ),
    switchMap(action =>
      this.supplierService.addSupplier(action.supplier).pipe(
        map(
          item =>
            new supplierActions.AddSupplierSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new supplierActions.AddSupplierFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateSupplierEffect$: Observable<Action> = this.actions$.pipe(
    ofType<supplierActions.UpdateSupplierRequestAction>(
      supplierActions.ActionTypes.UPDATE_SUPPLIER_REQUEST
    ),
    switchMap(action =>
      this.supplierService.updateSupplier(action.id, action.supplier).pipe(
        map(
          item =>
            new supplierActions.UpdateSupplierSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(
            new supplierActions.UpdateSupplierFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  deleteSupplierEffect$: Observable<Action> = this.actions$.pipe(
    ofType<supplierActions.DeleteSupplierRequestAction>(
      supplierActions.ActionTypes.DELETE_SUPPLIER_REQUEST
    ),
    switchMap(action =>
      this.supplierService.deleteSupplier(action.id).pipe(
        map(
          items =>
            new supplierActions.DeleteSupplierSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new supplierActions.DeleteSupplierFailureAction({ error })
          )
        )
      )
    )
  );
}
