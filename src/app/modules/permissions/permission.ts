import { ModuleName, PermissionType } from 'src/app/models/general';

export interface Permission {
  id: number;
  name: string;
  type: PermissionType;
  group ?: ModuleName;
  isChecked ?: boolean;
  isRolePermission ?: boolean;
}

export interface PermissionRequest {
  name: string;
  type: string;
  group: string;
}


export class PermissionGroup {
  group: ModuleName;
  permissions: Permission[] = [];
}
