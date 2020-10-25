import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { RoleSerializerService } from '../role/role-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class AdminSerializerService {

  constructor(
    private roleSerializer: RoleSerializerService
  ) { }

  getAdmin(adminResponse: any) {
    const admin: Admin = {
      id: parseInt(adminResponse.id, 0),
      name: adminResponse.attributes.name,
      description: adminResponse.attributes.description,
      email: adminResponse.attributes.email,
      countryId: adminResponse.attributes.countryId,
      active: adminResponse.attributes.active ? true : false,
      isTopLevel: adminResponse.attributes.isTopLevel ? true : false,
      roleId: parseInt(adminResponse.attributes.roleId, 0),
      role: this.roleSerializer.getRole(adminResponse.relationships.role),
      partnerId: parseInt(adminResponse.attributes.partnerId, 0),
      apiKey: adminResponse.attributes.apiKey,
      token: adminResponse.attributes.token
        ? adminResponse.attributes.token
        : '',
    };
    return admin;
  }
}
