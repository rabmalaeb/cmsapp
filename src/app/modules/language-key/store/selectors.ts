import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { languageKeyAdapter, State } from './state';
import { LanguageKey } from '../language-key';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getTotalItems = (state: State): number => state.total;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectLanguagekeyState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('languagekey');

export const selectAllLanguagekeyItems: (
  state: object
) => LanguageKey[] = languageKeyAdapter.getSelectors(selectLanguagekeyState)
  .selectAll;

export const selectLanguagekeyById = (id: number) =>
  createSelector(
    selectAllLanguagekeyItems,
    (allLanguageKeys: LanguageKey[]) => {
      if (allLanguageKeys) {
        return allLanguageKeys.find(languagekey => languagekey.id === id);
      } else {
        return null;
      }
    }
  );

export const selectLanguagekeyLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectLanguagekeyState,
  getLoadingError
);

export const selectLanguagekeyActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectLanguagekeyState,
  getActionError
);

export const selectLanguagekeyIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectLanguagekeyState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectLanguagekeyState,
  getIsLoadingAction
  );

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectLanguagekeyState,
  getIsLoadingItem
  );

export const selectTotalNumberOfItems: MemoizedSelector<
  object,
  number
> = createSelector(
  selectLanguagekeyState,
  getTotalItems
);
