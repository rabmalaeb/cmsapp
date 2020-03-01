import { Permission } from '../permissions/permission';

export interface Role {
  id: number;
  name: string;
  partnerId?: number;
  permissions: Permission[];
}

export interface RoleRequest {
  id?: number;
  name: string;
  partnerId: number;
  permissions: number[];
}
