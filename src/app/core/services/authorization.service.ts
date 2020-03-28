import { Injectable } from '@angular/core';

import { PermissionType } from 'src/app/shared/models/general';
import { AuthenticationService } from './authentication.service';
import { Permission } from '../../modules/permissions/permission';
import { RootStoreState } from '../../root-store';
import { Store } from '@ngrx/store';
import {
  PermissionStoreActions,
  PermissionStoreSelectors
} from '../../modules/permissions/store';
import { Observable } from 'rxjs';
import { map, take, filter, switchMap } from 'rxjs/operators';
import { ModuleName } from 'src/app/shared/models/nav';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  adminPermissions: Permission[];
  rolePermissions$: Observable<Permission[]>;
  isLoadingPermissions$: Observable<boolean>;
  constructor(
    private authenticationService: AuthenticationService,
    private store$: Store<RootStoreState.State>
  ) {}

  getRolePermissions() {
    const roleId = this.authenticationService.getCurrentUser().roleId;
    this.store$.dispatch(
      new PermissionStoreActions.LoadPermissionsByRoleAction(roleId)
    );

    this.rolePermissions$ = this.store$.select(
      PermissionStoreSelectors.selectPermissionForRole
    );

    this.isLoadingPermissions$ = this.store$.select(
      PermissionStoreSelectors.selectIsLoadingPermissionsForRole
    );
  }

  /**
   * check if admin has View permissions on the module
   * @param moduleName the module Name
   */
  canView(moduleName: ModuleName): Observable<boolean> {
    return this.checkPermission(moduleName, PermissionType.VIEW);
  }

  /**
   * check if admin has Edit permissions on the module
   * @param moduleName the module Name
   */
  canEdit(moduleName: ModuleName): Observable<boolean> {
    return this.checkPermission(moduleName, PermissionType.EDIT);
  }

  /**
   * check if admin has Delete permissions on the module
   * @param moduleName the module Name
   */
  canDelete(moduleName: ModuleName): Observable<boolean> {
    return this.checkPermission(moduleName, PermissionType.DELETE);
  }

  /**
   * check if admin has Add permissions on the module
   * @param moduleName the module Name
   */
  canAdd(moduleName: ModuleName): Observable<boolean> {
    return this.checkPermission(moduleName, PermissionType.ADD);
  }

  waitForPermissionsToLoad(): Observable<boolean> {
    return this.store$
      .select(PermissionStoreSelectors.selectIsLoadedPermissionsForRole)
      .pipe(
        filter(loaded => loaded),
        take(1)
      );
  }

  private checkPermission(
    moduleName: ModuleName,
    permissionType: PermissionType
  ): Observable<boolean> {
   return this.waitForPermissionsToLoad().pipe(
      switchMap(() => {
        return this.rolePermissions$.pipe(
          map(permissions => {
            if (!permissions) {
              return false;
            }
            const hasPermission = permissions.find(
              permission =>
                permission.group.toLowerCase() === moduleName.toLowerCase() &&
                permission.type === permissionType
            );
            if (hasPermission) {
              return true;
            }
            return false;
          })
        );
      })
    );
  }
}
