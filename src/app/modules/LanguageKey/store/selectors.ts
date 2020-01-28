import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { languagekeyAdapter, State } from './state';
import { LanguageKey } from '../languagekey';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectLanguagekeyState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('languagekey');

export const selectAllLanguagekeyItems: (
  state: object
) => LanguageKey[] = languagekeyAdapter.getSelectors(selectLanguagekeyState)
  .selectAll;

export const selectLanguagekeyById = (id: number) =>
  createSelector(
    selectAllLanguagekeyItems,
    (allLanguagekeys: LanguageKey[]) => {
      if (allLanguagekeys) {
        return allLanguagekeys.find(languagekey => languagekey.id === id);
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
