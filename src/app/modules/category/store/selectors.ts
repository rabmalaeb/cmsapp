import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { categoryAdapter, State } from './state';
import { Category } from '../category';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectCategoryState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('category');

export const selectAllCategoryItems: (
  state: object
) => Category[] = categoryAdapter.getSelectors(selectCategoryState).selectAll;

export const selectCategoryById = (id: number) =>
  createSelector(
    selectAllCategoryItems,
    (allCategories: Category[]) => {
      if (allCategories) {
        return allCategories.find(category => category.id === id);
      } else {
        return null;
      }
    }
  );

export const selectCategoryLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectCategoryState,
  getLoadingError
);

export const selectCategoryActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectCategoryState,
  getActionError
);

export const selectCategoryIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectCategoryState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectCategoryState,
  getIsLoadingAction
  );

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectCategoryState,
  getIsLoadingItem
);
