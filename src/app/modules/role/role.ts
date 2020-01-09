import { Permission } from '../permissions/permission';

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface RoleRequest {
  name: string;
  permissions: number[];
}
