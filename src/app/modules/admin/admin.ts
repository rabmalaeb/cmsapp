import { Role } from '../role/role';

export interface Admin {
  id?: number;
  name: string;
  description: string;
  email: string;
  active: boolean;
  roleId: number;
  role?: Role;
  password?: string;
}
