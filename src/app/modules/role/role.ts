import { Permission } from '../permissions/permission';
import { Partner } from '../partner/partner';
import FilterRequest from 'src/app/shared/request';

export interface Role {
  id: number;
  name: string;
  partnerId?: number;
  partner: Partner;
  permissions: Permission[];
}

export interface RoleActionRequest {
  id?: number;
  name?: string;
  partnerId?: number;
  permissions?: number[];
}

export class RoleRequest extends FilterRequest {}
