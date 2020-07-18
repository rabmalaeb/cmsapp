import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { countryAdapter, State } from './state';
import { Country } from '../country';

export const getLoadingError = (state: State): any => state.loadingError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectCountryState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('country');

export const selectAllCountryItems: (
  state: object
) => Country[] = countryAdapter.getSelectors(selectCountryState).selectAll;

export const selectCountryById = (id: number) =>
  createSelector(
    selectAllCountryItems,
    (allCountries: Country[]) => {
      if (allCountries) {
        return allCountries.find(country => country.id === id);
      } else {
        return null;
      }
    }
  );

export const selectCountryLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectCountryState,
  getLoadingError
);


export const selectCountryIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectCountryState,
  getIsLoading
);
