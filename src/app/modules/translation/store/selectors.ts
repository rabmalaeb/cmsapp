import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { translationAdapter, State } from './state';
import { Translation } from '../translation';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingAction = (state: State): boolean => state.isLoadingAction;

export const selectTranslationState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('translation');

export const selectAllTranslationItems: (
  state: object
) => Translation[] = translationAdapter.getSelectors(selectTranslationState).selectAll;

export const selectTranslationById = (id: number) =>
  createSelector(
    selectAllTranslationItems,
    (allTranslations: Translation[]) => {
      if (allTranslations) {
        return allTranslations.find(translation => translation.id === id);
      } else {
        return null;
      }
    }
  );

export const selectTranslationLoadingError: MemoizedSelector<object, any> = createSelector(
  selectTranslationState,
  getLoadingError
);

export const selectTranslationActionError: MemoizedSelector<object, any> = createSelector(
  selectTranslationState,
  getActionError
);

export const selectTranslationIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectTranslationState,
  getIsLoading
);


export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectTranslationState,
  getIsLoadingAction
);