import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { productAdapter, State } from './state';
import { Product } from '../product';
import { NumberRange } from 'src/app/shared/models/general';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

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

export const selectRetailPriceRange = (): MemoizedSelector<object, NumberRange> =>
  createSelector(
    selectAllProductItems,
    (allProducts: Product[]) => {
      let minimum = 1000000;
      let maximum = 0;
      if (allProducts) {
        allProducts.forEach(product => {
          if (product.retailPrice < minimum) {
            minimum = product.retailPrice;
          }
          if (maximum < product.retailPrice) {
            maximum = product.retailPrice;
          }
        });
        return {
          minimum,
          maximum
        };
      }
    }
  );


export const selectOriginalPriceRange = (): MemoizedSelector<object, NumberRange> =>
  createSelector(
    selectAllProductItems,
    (allProducts: Product[]) => {
      let minimum = 1000000;
      let maximum = 0;
      if (allProducts) {
        allProducts.forEach(product => {
          if (product.originalPrice < minimum) {
            minimum = product.originalPrice;
          }
          if (maximum < product.originalPrice) {
            maximum = product.originalPrice;
          }
        });
        return {
          minimum,
          maximum
        };
      }
    }
  );

export const selectProductLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectProductState,
  getLoadingError
);

export const selectProductActionError: MemoizedSelector<
  object,
  any
> = createSelector(
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
