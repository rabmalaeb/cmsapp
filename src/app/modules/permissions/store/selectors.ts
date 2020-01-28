import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { permissionAdapter, State } from './state';
import { Permission } from '../permission';

export const getLoadingError = (state: State): any => state.loadingError;

export const getPermissionsForRole = (state: State): any => state.PermissionsForRole;

export const getActionError = (state: State): any => state.actionError;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsLoadingAction = (state: State): boolean => state.isLoadingAction;

export const selectPermissionState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('permission');

export const selectAllPermissionItems: (
  state: object
) => Permission[] = permissionAdapter.getSelectors(selectPermissionState).selectAll;

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

export const selectPermissionForRole: MemoizedSelector<object, any> = createSelector(
  selectPermissionState,
  getPermissionsForRole
);

export const selectPermissionLoadingError: MemoizedSelector<object, any> = createSelector(
  selectPermissionState,
  getLoadingError
);

export const selectPermissionActionError: MemoizedSelector<object, any> = createSelector(
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


export const selectIsLoadingAction: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPermissionState,
  getIsLoadingAction
);