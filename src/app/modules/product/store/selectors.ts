import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { productAdapter, State } from './state';
import { Product } from '../product';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean => state.isLoadingAction;

export const selectProductState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('product');

export const selectAllProductItems: (
  state: object
) => Product[] = productAdapter.getSelectors(selectProductState).selectAll;

export const selectProductById = (id: number) =>
  createSelector(
    selectAllProductItems,
    (allProducts: Product[]) => {
      if (allProducts) {
        return allProducts.find(product => product.id === id);
      } else {
        return null;
      }
    }
  );

export const selectProductLoadingError: MemoizedSelector<object, any> = createSelector(
  selectProductState,
  getLoadingError
);

export const selectProductActionError: MemoizedSelector<object, any> = createSelector(
  selectProductState,
  getActionError
);

export const selectProductIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectProductState,
  getIsLoading
);


export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectProductState,
  getIsLoadingAction
);

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectProductState,
  getIsLoadingItem
);
