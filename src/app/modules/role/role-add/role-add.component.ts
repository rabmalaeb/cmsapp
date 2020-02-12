import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ModuleName, ALERT_MESSAGES } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Role, RoleRequest } from '../role';
import { PermissionGroup, Permission } from '../../permissions/permission';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs';
import { RoleStoreSelectors, RoleStoreActions } from '../store';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { filter, map } from 'rxjs/operators';
import {
  PermissionStoreActions,
  PermissionStoreSelectors
} from '../../permissions/store';
import { PermissionSerializerService } from '../../permissions/permission-serializer.service';
import { ActionTypes } from '../store/actions';
import { isArray } from 'util';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private permissionSerializer: PermissionSerializerService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}
  permissions$: Observable<Permission[]>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;
  permissionGroups: PermissionGroup[];
  isLoading$: Observable<boolean>;
  role$: Observable<Role>;
  permissionGroups$: Observable<PermissionGroup[]>;
  actionType: ActionType;
  isLoadingRole = false;
  roleForm: FormGroup;
  isLoading = false;
  role: Role;

  ngOnInit() {
    this.initializeStoreVariables();
    this.initializeForm();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getRole(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        console.log('we should builds');

        this.buildNewRoleForm();
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      RoleStoreSelectors.selectRoleActionError
    );

    this.isLoadingAction$ = this.store$.select(
      RoleStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_ROLE_SUCCESS ||
            action.type === ActionTypes.ADD_ROLE_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Role Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Role Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_ROLE_FAILURE ||
            action.type === ActionTypes.ADD_ROLE_FAILURE
        )
      )
      .subscribe(response => {
        this.errorHandler.handleErrorResponse(response.payload.error);
      });
  }

  getRole(id: number) {
    this.store$.dispatch(new RoleStoreActions.GetRoleRequestAction(id));
    this.role$ = this.store$.select(RoleStoreSelectors.selectRoleById(id));
    this.loadingErrors$ = this.store$.select(
      RoleStoreSelectors.selectRoleLoadingError
    );
    this.buildExistingRoleForm();
  }

  buildNewRoleForm() {
    this.roleForm = this.form.group({
      name: ['', [Validators.required]]
    });
  }

  buildExistingRoleForm() {
    this.role$.subscribe(role => {
      this.role = role;
      this.roleForm = this.form.group({
        name: [role.name, [Validators.required]]
      });
    });
  }

  initializeForm() {
    this.getPermissions();
    this.buildForm();
  }

  getPermissions() {
    this.store$.dispatch(new PermissionStoreActions.LoadRequestAction());
    this.permissions$ = this.store$.select(
      PermissionStoreSelectors.selectAllPermissionItems
    );
    this.permissions$.subscribe(permissions => {
      this.permissionGroups = this.permissionSerializer.groupPermissions(
        permissions
      );
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
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
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
    this.store$.dispatch(new RoleStoreActions.AddRoleRequestAction(params));
  }

  updateRole(params: RoleRequest) {
    const id = this.role.id;
    this.store$.dispatch(
      new RoleStoreActions.UpdateRoleRequestAction(id, params)
    );
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
    return this.isLoadingAction$.pipe(
      map(isLoading => {
        if (isLoading) {
          return 'Loading';
        }
        if (this.actionType === ActionType.EDIT) {
          return 'Update';
        }
        return 'Add';
      })
    );
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
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.ROLES)
    );
  }
}
