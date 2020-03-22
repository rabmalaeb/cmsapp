import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { permissionAdapter, State } from './state';
import { Permission } from '../permission';

export const getLoadingError = (state: State): any => state.loadingError;

export const getPermissionsForRole = (state: State): any =>
  state.PermissionsForRole;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingItem = (state: State): boolean => state.isLoadingItem;

export const getTotalItems = (state: State): number => state.total;

export const getIsLoadingPermissionsForRole = (state: State): boolean =>
  state.isLoadingPermissionsForRole;

export const getIsLoadedPermissionsForRole = (state: State): boolean =>
  state.isLoadedPermissionsForRole;

export const getIsLoadingAction = (state: State): boolean =>
  state.isLoadingAction;

export const selectPermissionState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('permission');

export const selectAllPermissionItems: (
  state: object
) => Permission[] = permissionAdapter.getSelectors(selectPermissionState)
  .selectAll;

export const selectPermissionById = (id: number) =>
  createSelector(
    selectAllPermissionItems,
    (allPermissions: Permission[]) => {
      if (allPermissions) {
        return allPermissions.find(permission => permission.id === id);
      } else {
        return null;
      }
    }
  );

export const selectPermissionForRole: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPermissionState,
  getPermissionsForRole
);

export const selectPermissionLoadingError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPermissionState,
  getLoadingError
);

export const selectPermissionActionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPermissionState,
  getActionError
);

export const selectPermissionIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPermissionState,
  getIsLoading
);

export const selectIsLoadingPermissionsForRole: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPermissionState,
  getIsLoadingPermissionsForRole
);

export const selectIsLoadedPermissionsForRole: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPermissionState,
  getIsLoadedPermissionsForRole
  );

export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPermissionState,
  getIsLoadingAction
  );

export const selectIsLoadingItem: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPermissionState,
  getIsLoadingItem
  );

export const selectTotalNumberOfItems: MemoizedSelector<
  object,
  number
> = createSelector(
  selectPermissionState,
  getTotalItems
);
