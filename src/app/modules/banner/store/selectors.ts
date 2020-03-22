import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { bannerAdapter, State } from './state';
import { Banner } from '../banner';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getTotalItems = (state: State): number => state.total;

export const getIsLoadingAction = (state: State): boolean => state.isLoadingAction;

export const selectBannerState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('banner');

export const selectAllBannerItems: (
  state: object
) => Banner[] = bannerAdapter.getSelectors(selectBannerState).selectAll;

export const selectBannerById = (id: number) =>
  createSelector(
    selectAllBannerItems,
    (allBanners: Banner[]) => {
      if (allBanners) {
        return allBanners.find(banner => banner.id === id);
      } else {
        return null;
      }
    }
  );

export const selectBannerLoadingError: MemoizedSelector<object, any> = createSelector(
  selectBannerState,
  getLoadingError
);

export const selectBannerActionError: MemoizedSelector<object, any> = createSelector(
  selectBannerState,
  getActionError
);

export const selectBannerIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectBannerState,
  getIsLoading
);


export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectBannerState,
  getIsLoadingAction
);

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectBannerState,
  getIsLoadingItem
  );

export const selectTotalNumberOfItems: MemoizedSelector<
  object,
  number
> = createSelector(
  selectBannerState,
  getTotalItems
);
