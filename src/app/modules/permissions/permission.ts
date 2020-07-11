import { PermissionType } from 'src/app/shared/models/general';
import FilterRequest from 'src/app/shared/request';
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

export class PermissionRequest extends FilterRequest {}


export class PermissionGroup {
  group: ModuleName;
  permissions: Permission[] = [];
}
