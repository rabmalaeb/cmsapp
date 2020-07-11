import FilterRequest from 'src/app/shared/request';

export interface User {
  id ?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export class UserRequest extends FilterRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
}
