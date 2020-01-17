import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, USER_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Role, RoleRequest } from '../role';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { RoleService } from '../role.service';
import { PermissionGroup } from '../../permissions/permission';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PermissionService } from '../../permissions/permission.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) {}

  roleForm: FormGroup;
  actionType: ActionType;
  role: Role;
  permissionGroups: PermissionGroup[];
  isLoadingPermissions = false;
  isLoadingRole = false;
  isLoading = false;

  ngOnInit() {
    this.route.params.forEach(param => {
      if (param.id) {
        this.getRole(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.initializeForm();
      }
    });
  }

  getRole(id: number) {
    this.isLoadingRole = true;
    this.roleService.getRole(id).subscribe(response => {
      this.isLoadingRole = false;
      this.role = response;
      this.initializeForm();
    });
  }

  initializeForm() {
    this.getPermissions();
    this.buildForm();
  }

  getPermissions() {
    this.isLoadingPermissions = true;
    this.permissionService.getGroupedPermissions().subscribe(response => {
      this.permissionGroups = response;
      this.isLoadingPermissions = false;
      this.setCheckedPermissions();
    });
  }

  setCheckedPermissions() {
    if (this.role) {
      this.permissionGroups.forEach(group => {
        group.permissions.forEach(groupPermission => {
          this.role.permissions.forEach(permission => {
            if (groupPermission.id === permission.id) {
              groupPermission.isChecked = true;
            }
          });
        });
      });
    }
  }

  buildForm() {
    let name = '';
    if (this.role) {
      name = this.role.name;
    }
    this.roleForm = this.form.group({
      name: [name, [Validators.required]]
    });
  }

  get name() {
    return this.roleForm.get('name');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.roleForm.valid) {
      this.notificationService.showError(USER_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.role) {
      this.updateRole(this.buildRoleParams());
    } else {
      this.addRole(this.buildRoleParams());
    }
  }

  buildRoleParams(): RoleRequest {
    return {
      name: this.name.value,
      permissions: this.getSelectedPermissions()
    };
  }

  addRole(params: RoleRequest) {
    this.isLoading = true;
    this.roleService.addRole(params).subscribe(
      () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Role added successfully');
      },
      error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      }
    );
  }

  updateRole(params: RoleRequest) {
    this.isLoading = true;
    const id = this.role.id;
    this.roleService.updateRole(id, params).subscribe(() => {
      this.isLoading = false;
      this.notificationService.showSuccess('Role updated successfully');
    });
  }

  getSelectedPermissions() {
    const selectedPermissions: number[] = [];
    this.permissionGroups.forEach(group => {
      group.permissions.forEach(permission => {
        if (permission.isChecked) {
          selectedPermissions.push(permission.id);
        }
      });
    });
    return selectedPermissions;
  }

  get buttonLabel() {
    if (this.isLoading) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Role';
    }
    return 'Add Role';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditRole() {
    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.ROLES);
  }
}
