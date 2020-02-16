import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { mediaAdapter, State } from './state';
import { Media } from '../media';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectMediaState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('media');

export const selectAllMediaItems: (
  state: object
) => Media[] = mediaAdapter.getSelectors(selectMediaState).selectAll;

export const selectMediaById = (id: number) =>
  createSelector(
    selectAllMediaItems,
    (allMedias: Media[]) => {
      if (allMedias) {
        return allMedias.find(media => media.id === id);
      } else {
        return null;
      }
    }
  );

export const selectMediaLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectMediaState,
  getLoadingError
);

export const selectMediaActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectMediaState,
  getActionError
);

export const selectMediaIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectMediaState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectMediaState,
  getIsLoadingAction
);

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectMediaState,
  getIsLoadingItem
);
