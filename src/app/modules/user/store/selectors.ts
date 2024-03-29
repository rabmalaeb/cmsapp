import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { userAdapter, State } from './state';
import { User } from '../user';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getTotalItems = (state: State): number => state.total;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectUserState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('user');

export const selectAllUserItems: (
  state: object
) => User[] = userAdapter.getSelectors(selectUserState).selectAll;

export const selectUserById = (id: number) =>
  createSelector(
    selectAllUserItems,
    (allUsers: User[]) => {
      if (allUsers) {
        return allUsers.find(user => user.id === id);
      } else {
        return null;
      }
    }
  );

export const selectUserLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectUserState,
  getLoadingError
);

export const selectUserActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectUserState,
  getActionError
);

export const selectUserIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectUserState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectUserState,
  getIsLoadingAction
  );

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectUserState,
  getIsLoadingItem
);

export const selectTotalNumberOfItems: MemoizedSelector<
  object,
  number
> = createSelector(
  selectUserState,
  getTotalItems
);
