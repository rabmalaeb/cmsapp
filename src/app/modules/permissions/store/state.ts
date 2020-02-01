import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Permission } from '../permission';

export const permissionAdapter: EntityAdapter<Permission> = createEntityAdapter<
  Permission
>({
  selectId: model => model.id,
  sortComparer: (a: Permission, b: Permission): number =>
    b.name.toString().localeCompare(a.name.toString())
});

export interface State extends EntityState<Permission> {
  isLoading?: boolean;
  isLoadingAction?: boolean;
  loadingError?: any;
  actionError?: any;
  isLoadingPermissionsForRole?: boolean;
  isLoadedPermissionsForRole?: boolean;
  PermissionsForRole?: Permission[];
}

export const initialState: State = permissionAdapter.getInitialState({
  isLoading: false,
  error: null
});
