import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { brandAdapter, State } from './state';
import { Brand } from '../brand';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getTotalItems = (state: State): number => state.total;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectBrandState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('brand');

export const selectAllBrandItems: (
  state: object
) => Brand[] = brandAdapter.getSelectors(selectBrandState).selectAll;

export const selectBrandById = (id: number) =>
  createSelector(
    selectAllBrandItems,
    (allBrands: Brand[]) => {
      if (allBrands) {
        return allBrands.find(brand => brand.id === id);
      } else {
        return null;
      }
    }
  );

export const selectBrandLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectBrandState,
  getLoadingError
);

export const selectBrandActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectBrandState,
  getActionError
);

export const selectBrandIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectBrandState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectBrandState,
  getIsLoadingAction
);

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectBrandState,
  getIsLoadingItem
  );

export const selectTotalNumberOfItems: MemoizedSelector<
  object,
  number
> = createSelector(
  selectBrandState,
  getTotalItems
);
