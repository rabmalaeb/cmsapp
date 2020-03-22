import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { partnerAdapter, State } from './state';
import { Partner } from '../partner';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getTotalItems = (state: State): number => state.total;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectPartnerState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('partner');

export const selectAllPartnerItems: (
  state: object
) => Partner[] = partnerAdapter.getSelectors(selectPartnerState).selectAll;

export const selectPartnerById = (id: number) =>
  createSelector(
    selectAllPartnerItems,
    (allPartners: Partner[]) => {
      if (allPartners) {
        return allPartners.find(partner => partner.id === id);
      } else {
        return null;
      }
    }
  );

export const selectPartnerLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPartnerState,
  getLoadingError
);

export const selectPartnerActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPartnerState,
  getActionError
);

export const selectPartnerIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPartnerState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPartnerState,
  getIsLoadingAction
  );

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPartnerState,
  getIsLoadingItem
);

export const selectTotalNumberOfItems: MemoizedSelector<
  object,
  number
> = createSelector(
  selectPartnerState,
  getTotalItems
);
