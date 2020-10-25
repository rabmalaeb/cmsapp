import { Role } from '../role/role';
import FilterRequest from 'src/app/shared/request';

export interface Admin {
  id?: number;
  name: string;
  description: string;
  email: string;
  countryId: number;
  active: boolean;
  roleId: number;
  role?: Role;
  password?: string;
  confirmPassword?: string;
  token?: string;
  partnerId?: number;
  apiKey?: string;
  isTopLevel: boolean;
}

export class AdminRequest extends FilterRequest {
  id?: number;
  name?: string;
  description?: string;
  email?: string;
  active?: string;
  countryId?: string;
  partnerId?: string;
  roleId?: string;
  password?: string;
  confirmPassword?: string;
}
