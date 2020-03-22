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
  token?: string;
  partnerId?: number;
  apiKey?: string;
}

export interface AdminRequest extends Request {}
