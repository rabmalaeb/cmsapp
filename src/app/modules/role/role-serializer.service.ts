import { Injectable } from '@angular/core';
import { Role } from './role';
import { PermissionSerializerService } from '../permissions/permission-serializer.service';
import { Permission } from '../permissions/permission';

@Injectable({
  providedIn: 'root'
})
export class RoleSerializerService {
  constructor(
    private permissionSerializerService: PermissionSerializerService
  ) {}

  getRole(roleResponse: any) {
    if (!roleResponse.id) {
      return null;
    }
    const role: Role = {
      id: parseInt(roleResponse.id, 0),
      name: roleResponse.attributes.name,
      partnerId: parseInt(roleResponse.attributes.partnerId, 0),
      permissions: this.getRolePermissions(
        roleResponse.relationships.permissions
      )
    };
    return role;
  }

  getRolePermissions(permissionsResponse) {
    const permissionResult: Permission[] = [];
    permissionsResponse.forEach(permission => {
      permissionResult.push(
        this.permissionSerializerService.getPermission(permission)
      );
    });
    return permissionResult;
  }
}
