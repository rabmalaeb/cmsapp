import { Role } from '../role/role';
import Request from 'src/app/shared/request';

export interface Admin {
  id?: number;
  name: string;
  description: string;
  email: string;
  country: string;
  active: boolean;
  roleId: number;
  role?: Role;
  password?: string;
  confirmPassword?: string;
  token?: string;
  partnerId?: number;
  apiKey?: string;
}

export interface AdminRequest extends Request {
  id?: number;
  name?: string;
  description?: string;
  email?: string;
  active?: string;
  country?: string;
  partnerId?: string;
  roleId?: string;
  password?: string;
  confirmPassword?: string;
}
