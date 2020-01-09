import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserSerializerService {

  constructor() { }

  getUser(userResponse: any) {
    const user: User = {
      id: parseInt(userResponse.id, 0),
      firstName: userResponse.attributes.firstName,
      lastName: userResponse.attributes.lastName,
      email: userResponse.attributes.email,
      mobile: userResponse.attributes.mobile
    };
    return user;
  }
}
