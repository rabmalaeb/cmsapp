import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { languageAdapter, State } from './state';
import { Manufacturer } from '../manufacturer';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getTotalItems = (state: State): number => state.total;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectManufacturerState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('manufacturer');

export const selectAllManufacturerItems: (
  state: object
) => Manufacturer[] = languageAdapter.getSelectors(selectManufacturerState).selectAll;

export const selectManufacturerById = (id: number) =>
  createSelector(
    selectAllManufacturerItems,
    (allManufacturers: Manufacturer[]) => {
      if (allManufacturers) {
        return allManufacturers.find(manufacturer => manufacturer.id === id);
      } else {
        return null;
      }
    }
  );

export const selectManufacturerLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectManufacturerState,
  getLoadingError
);

export const selectManufacturerActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectManufacturerState,
  getActionError
);

export const selectManufacturerIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectManufacturerState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectManufacturerState,
  getIsLoadingAction
);

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectManufacturerState,
  getIsLoadingItem
  );

export const selectTotalNumberOfItems: MemoizedSelector<
  object,
  number
> = createSelector(
  selectManufacturerState,
  getTotalItems
);
