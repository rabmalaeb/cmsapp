import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as categoryActions from './actions';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryStoreEffects {
  constructor(
    private categoryService: CategoryService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<categoryActions.LoadRequestAction>(
      categoryActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new categoryActions.LoadRequestAction()),
    switchMap(action =>
      this.categoryService.getCategories().pipe(
        map(
          items =>
            new categoryActions.LoadSuccessAction({
              items
            })
        ),
        catchError(error =>
          observableOf(new categoryActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  getCategoryEffect$: Observable<Action> = this.actions$.pipe(
    ofType<categoryActions.GetCategoryRequestAction>(
      categoryActions.ActionTypes.GET_CATEGORY_REQUEST
    ),
    switchMap(action =>
      this.categoryService.getCategory(action.id).pipe(
        map(
          item =>
            new categoryActions.GetCategorySuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new categoryActions.GetCategoryFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  addCategoryEffect$: Observable<Action> = this.actions$.pipe(
    ofType<categoryActions.AddCategoryRequestAction>(
      categoryActions.ActionTypes.ADD_CATEGORY_REQUEST
    ),
    switchMap(action =>
      this.categoryService.addCategory(action.category).pipe(
        map(
          item =>
            new categoryActions.AddCategorySuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(new categoryActions.AddCategoryFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateCategoryEffect$: Observable<Action> = this.actions$.pipe(
    ofType<categoryActions.UpdateCategoryRequestAction>(
      categoryActions.ActionTypes.UPDATE_CATEGORY_REQUEST
    ),
    switchMap(action =>
      this.categoryService.updateCategory(action.id, action.category).pipe(
        map(
          item =>
            new categoryActions.UpdateCategorySuccessAction({
              id: action.id,
              item
            })
        ),
        catchError(error =>
          observableOf(
            new categoryActions.UpdateCategoryFailureAction({ error })
          )
        )
      )
    )
  );

  @Effect()
  deleteCategoryEffect$: Observable<Action> = this.actions$.pipe(
    ofType<categoryActions.DeleteCategoryRequestAction>(
      categoryActions.ActionTypes.DELETE_CATEGORY_REQUEST
    ),
    switchMap(action =>
      this.categoryService.deleteCategory(action.id).pipe(
        map(
          items =>
            new categoryActions.DeleteCategorySuccessAction({
              id: action.id,
              items
            })
        ),
        catchError(error =>
          observableOf(
            new categoryActions.DeleteCategoryFailureAction({ error })
          )
        )
      )
    )
  );
}
