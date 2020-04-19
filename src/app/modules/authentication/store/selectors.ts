import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './state';
import { Admin } from '../../admin/admin';

export const getLoginError = (state: State): any => state.loginError;

export const isLoginRequestLoading = (state: State): boolean => state.isLoginRequestLoading;

export const getLoggedInAdmin = (state: State): Admin => state.admin;

export const getResetPasswordError = (state: State): any => state.resetPasswordError;

export const isResetPasswordRequestLoading = (state: State): boolean => state.isResetPasswordRequestLoading;

export const getSetPasswordError = (state: State): any => state.setPasswordError;

export const isSetPasswordRequestLoading = (state: State): boolean => state.isSetPasswordRequestLoading;

export const selectAuthenticationState: MemoizedSelector<
  object,
  State
  > = createFeatureSelector<State>('authentication');

export const selectLoginLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAuthenticationState,
  getLoginError
);

export const selectLoginRequestLoading: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAuthenticationState,
  isLoginRequestLoading
);

export const selectLoggedInAdmin: MemoizedSelector<
  object,
  Admin
> = createSelector(
  selectAuthenticationState,
  getLoggedInAdmin
  );

export const selectResetPasswordError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAuthenticationState,
  getResetPasswordError
);

export const selectResetPasswordRequestLoading: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAuthenticationState,
  isResetPasswordRequestLoading
  );

export const selectSetPasswordLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAuthenticationState,
  getSetPasswordError
);

export const selectSetPasswordRequestLoading: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAuthenticationState,
  isSetPasswordRequestLoading
);
