import Request from 'src/app/shared/request';

export interface User {
  id ?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export interface UserRequest extends Request {}
