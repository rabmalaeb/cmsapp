import { UserStoreState } from '../modules/user/store';
import { RoleStoreState } from '../modules/role/store';
import { PermissionStoreState } from '../modules/permissions/store';

export interface State {
  user: UserStoreState.State;
  role: RoleStoreState.State;
  permission: PermissionStoreState.State;
}
