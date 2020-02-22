import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { supplierAdapter, State } from './state';
import { Supplier } from '../supplier';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectSupplierState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('supplier');

export const selectAllSupplierItems: (
  state: object
) => Supplier[] = supplierAdapter.getSelectors(selectSupplierState).selectAll;

export const selectSupplierById = (id: number) =>
  createSelector(
    selectAllSupplierItems,
    (allSuppliers: Supplier[]) => {
      if (allSuppliers) {
        return allSuppliers.find(supplier => supplier.id === id);
      } else {
        return null;
      }
    }
  );

export const selectSupplierLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectSupplierState,
  getLoadingError
);

export const selectSupplierActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectSupplierState,
  getActionError
);

export const selectSupplierIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectSupplierState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectSupplierState,
  getIsLoadingAction
  );

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectSupplierState,
  getIsLoadingItem
);
