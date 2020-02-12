import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as productActions from './actions';
import { ProductService } from '../product.service';

@Injectable()
export class ProductStoreEffects {
  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.LoadRequestAction>(
      productActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.productService.getProducts().pipe(
        map(
          items =>
            new productActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new productActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getProductEffect$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.GetProductRequestAction>(
      productActions.ActionTypes.GET_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.productService.getProduct(action.id).pipe(
        map(
          item =>
            new productActions.GetProductSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new productActions.GetProductFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addProductEffect$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.AddProductRequestAction>(
      productActions.ActionTypes.ADD_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.productService.addProduct(action.product).pipe(
        map(
          item =>
            new productActions.AddProductSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new productActions.AddProductFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateProductEffect$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.UpdateProductRequestAction>(
      productActions.ActionTypes.UPDATE_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.productService.updateProduct(action.id, action.product).pipe(
        map(
          item =>
            new productActions.UpdateProductSuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(new productActions.UpdateProductFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  deleteProductEffect$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.DeleteProductRequestAction>(
      productActions.ActionTypes.DELETE_PRODUCT_REQUEST
    ),
    switchMap(action =>
      this.productService.deleteProduct(action.id).pipe(
        map(
          items =>
            new productActions.DeleteProductSuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(new productActions.DeleteProductFailureAction({ error }))
        )
      )
    )
  );
}
