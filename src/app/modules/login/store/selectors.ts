import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './state';
import { Admin } from '../../admin/admin';

export const getLoadingError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getLoggedInAdmin = (state: State): Admin => state.admin;

export const selectLoginState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('Login');

export const selectLoginLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectLoginState,
  getLoadingError
);

export const selectLoginIsLoading: MemoizedSelector<
  object,
  any
> = createSelector(
  selectLoginState,
  getIsLoading
);

export const selectLoginLoggedInAdmin: MemoizedSelector<
  object,
  Admin
> = createSelector(
  selectLoginState,
  getLoggedInAdmin
);
