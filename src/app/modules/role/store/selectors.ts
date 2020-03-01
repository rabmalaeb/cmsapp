import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { roleAdapter, State } from './state';
import { Role } from 'src/app/modules/role/role';

export const getLoadingError = (state: State): any => state.loadingError;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectRoleState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('role');

export const selectAllRoleItems: (
  state: object
) => Role[] = roleAdapter.getSelectors(selectRoleState).selectAll;

export const selectRoleById = (id: number) =>
  createSelector(
    selectAllRoleItems,
    (allRoles: Role[]) => {
      if (allRoles) {
        return allRoles.find(role => role.id === id);
      } else {
        return null;
      }
    }
  );

export const selectRoleByPartnerId = (partnerId: number) =>
  createSelector(
    selectAllRoleItems,
    (allRoles: Role[]) => {
      if (allRoles) {
        return allRoles.filter(role => role.partnerId === partnerId);
      } else {
        return null;
      }
    }
  );

export const selectRoleLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectRoleState,
  getLoadingError
);

export const selectRoleActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectRoleState,
  getActionError
);

export const selectRoleIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectRoleState,
  getIsLoading
);

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectRoleState,
  getIsLoadingAction
);

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectRoleState,
  getIsLoadingItem
);
