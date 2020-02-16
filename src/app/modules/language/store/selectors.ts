import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { languageAdapter, State } from './state';
import { Language } from '../language';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectLanguageState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('language');

export const selectAllLanguageItems: (
  state: object
) => Language[] = languageAdapter.getSelectors(selectLanguageState).selectAll;

export const selectLanguageById = (id: number) =>
  createSelector(
    selectAllLanguageItems,
    (allLanguages: Language[]) => {
      if (allLanguages) {
        return allLanguages.find(language => language.id === id);
      } else {
        return null;
      }
    }
  );

export const selectLanguageLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectLanguageState,
  getLoadingError
);

export const selectLanguageActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectLanguageState,
  getActionError
);

export const selectLanguageIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectLanguageState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectLanguageState,
  getIsLoadingAction
);

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectLanguageState,
  getIsLoadingItem
);
