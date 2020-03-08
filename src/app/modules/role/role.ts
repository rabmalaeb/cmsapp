import { Permission } from '../permissions/permission';
import { Partner } from '../partner/partner';
import Request from 'src/app/shared/request';

export interface Role {
  id: number;
  name: string;
  partnerId?: number;
  partner: Partner;
  permissions: Permission[];
}

export interface RoleRequest extends Request {
  id?: number;
  name?: string;
  partnerId?: number;
  permissions?: number[];
}
