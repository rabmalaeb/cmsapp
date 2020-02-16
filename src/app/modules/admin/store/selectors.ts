import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { adminAdapter, State } from './state';
import { Admin } from '../admin';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectAdminState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('admin');

export const selectAllAdminItems: (
  state: object
) => Admin[] = adminAdapter.getSelectors(selectAdminState).selectAll;

export const selectAdminById = (id: number) =>
  createSelector(
    selectAllAdminItems,
    (allAdmins: Admin[]) => {
      if (allAdmins) {
        return allAdmins.find(admin => admin.id === id);
      } else {
        return null;
      }
    }
  );

export const selectAdminLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAdminState,
  getLoadingError
);

export const selectAdminActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectAdminState,
  getActionError
);

export const selectAdminIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAdminState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAdminState,
  getIsLoadingAction
  );

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAdminState,
  getIsLoadingItem
);
