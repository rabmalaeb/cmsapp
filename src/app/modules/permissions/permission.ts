import { PermissionType } from 'src/app/shared/models/general';
import Request from 'src/app/shared/request';
import { ModuleName } from 'src/app/shared/models/nav';

export interface Permission {
  id: number;
  name: string;
  type: PermissionType;
  group ?: ModuleName;
  isChecked ?: boolean;
  isRolePermission ?: boolean;
}

export interface PermissionActionRequest {
  id?: number;
  name?: string;
  type?: string;
  group?: string;
}

export interface PermissionRequest extends Request {}


export class PermissionGroup {
  group: ModuleName;
  permissions: Permission[] = [];
}
