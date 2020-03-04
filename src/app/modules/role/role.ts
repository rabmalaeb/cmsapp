import { Permission } from '../permissions/permission';
import { Partner } from '../partner/partner';

export interface Role {
  id: number;
  name: string;
  partnerId?: number;
  partner: Partner;
  permissions: Permission[];
}

export interface RoleRequest {
  id?: number;
  name: string;
  partnerId: number;
  permissions: number[];
}
