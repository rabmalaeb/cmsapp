import { Injectable } from '@angular/core';
import { Permission, PermissionGroup } from './permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionSerializerService {
  constructor() {}

  getPermission(permissionResponse: any, isRolePermission = false): Permission {
    const permission: Permission = {
      id: parseInt(permissionResponse.id, 0),
      name: permissionResponse.attributes.name,
      type: permissionResponse.attributes.type,
      group: permissionResponse.attributes.group,
      isChecked: false,
      isRolePermission
    };
    return permission;
  }

  getGroupedPermissions(response): PermissionGroup[] {
    const permissionGroups: PermissionGroup[] = [];
    response.forEach(permission => {
      const permissionFound = this.isInPermissionGroup(
        permission.attributes.group,
        permissionGroups
      );
      const permissionResult: Permission = {
        id: permission.id,
        name: permission.attributes.name,
        type: permission.attributes.type,
        isChecked: false
      };
      if (!permissionFound) {
        const permissionGroup = new PermissionGroup();
        permissionGroup.group = permission.attributes.group;
        permissionGroup.permissions.push(permissionResult);
        permissionGroups.push(permissionGroup);
      } else {
        permissionFound.permissions.push(permissionResult);
      }
    });
    return permissionGroups;
  }

  groupPermissions(permissions: Permission[]): PermissionGroup[] {
    const permissionGroups: PermissionGroup[] = [];
    permissions.forEach(permission => {
      const permissionFound = this.isInPermissionGroup(
        permission.group,
        permissionGroups
      );
      const permissionResult: Permission = {
        id: permission.id,
        name: permission.name,
        type: permission.type,
        isChecked: false
      };
      if (!permissionFound) {
        const permissionGroup = new PermissionGroup();
        permissionGroup.group = permission.group;
        permissionGroup.permissions.push(permissionResult);
        permissionGroups.push(permissionGroup);
      } else {
        permissionFound.permissions.push(permissionResult);
      }
    });
    return permissionGroups;
  }

  isInPermissionGroup(group: string, permissionGroups: PermissionGroup[]) {
    return permissionGroups.find(
      permissionGroup => permissionGroup.group === group
    );
  }
}
