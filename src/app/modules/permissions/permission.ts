import { ModuleName, PermissionType } from 'src/app/shared/models/general';

export interface Permission {
  id: number;
  name: string;
  type: PermissionType;
  group ?: ModuleName;
  isChecked ?: boolean;
  isRolePermission ?: boolean;
}

export interface PermissionRequest {
  id: number;
  name: string;
  type: string;
  group: string;
}


export class PermissionGroup {
  group: ModuleName;
  permissions: Permission[] = [];
}
