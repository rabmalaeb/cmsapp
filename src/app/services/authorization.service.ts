import { Injectable } from '@angular/core';

import { ModuleName, PermissionType } from 'src/app/models/general';
import { AuthenticationService } from './authentication.service';
import { RoleService } from '../modules/role/role.service';
import { Permission } from '../modules/permissions/permission';

@Injectable({
  providedIn: 'root',
})


export class AuthorizationService {

  adminPermissions: Permission[];
  isLoadingPermissions = false;
  constructor(
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
  ) { }

  getRolePermissions() {
    const roleId = this.authenticationService.getCurrentUser().roleId;
    if (roleId) {
      this.isLoadingPermissions = true;
      this.roleService.getRole(roleId).subscribe(response => {
        this.isLoadingPermissions = false;
        this.adminPermissions = response.permissions;
      });
    }
  }

  /**
   * check if admin has View permissions on the module
   * @param moduleName the module Name
   */
  canView(moduleName: ModuleName): boolean {
    return this.checkPermission(moduleName, PermissionType.VIEW);
  }

  /**
   * check if admin has Edit permissions on the module
   * @param moduleName the module Name
   */
  canEdit(moduleName: ModuleName): boolean {
    return this.checkPermission(moduleName, PermissionType.EDIT);
  }

  /**
   * check if admin has Delete permissions on the module
   * @param moduleName the module Name
   */
  canDelete(moduleName: ModuleName): boolean {
    return this.checkPermission(moduleName, PermissionType.DELETE);
  }

  /**
   * check if admin has Add permissions on the module
   * @param moduleName the module Name
   */
  canAdd(moduleName: ModuleName): boolean {
    return this.checkPermission(moduleName, PermissionType.ADD);
  }

  private checkPermission(moduleName: ModuleName, permissionType: PermissionType) {
    if (!this.adminPermissions) {
      return false;
    }
    const hasPermission = this.adminPermissions.find(permission => {
      return permission.group.toLowerCase() === moduleName.toLowerCase() && permission.type === permissionType;
    });
    if (hasPermission) {
      return true;
    }
    return false;
  }
}
