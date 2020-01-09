import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Permission } from '../permission';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PermissionService } from '../permission.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AppService } from 'src/app/services/app.service';
import { USER_MESSAGES, PermissionType, NavItem, ModuleName, ActionType } from 'src/app/models/general';
import { capitalize } from 'src/app/utils/general';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private permissionService: PermissionService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  permissionForm: FormGroup;
  actionType: ActionType;
  permission: Permission;
  isLoadingPermission = false;
  isLoading = false;
  permissionTypes: PermissionType[] = [
    PermissionType.ADD,
    PermissionType.VIEW,
    PermissionType.EDIT,
    PermissionType.DELETE
  ];
  appModules: NavItem[] = [];
  selectedModel: string;

  ngOnInit() {
    this.getAppModules();
    this.route.params.forEach(param => {
      if (param.id) {
        this.getPermission(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildForm();
      }
    });
  }

  getAppModules() {
    this.appModules = this.appService.activeNavBarItems;
  }

  getPermission(id: number) {
    this.isLoadingPermission = true;
    this.permissionService.getPermission(id).subscribe(response => {
      this.isLoadingPermission = false;
      this.permission = response;
      this.buildForm();
    });
  }

  buildForm() {
    let modulesName = '';
    let type = '';
    if (this.permission) {
      modulesName = this.permission.group.toLowerCase();
      type = this.permission.type;
    }
    this.permissionForm = this.form.group({
      modules: [modulesName, [Validators.required]],
      permissionType: [type, [Validators.required]]
    });
  }

  get modules() {
    return this.permissionForm.get('modules');
  }

  get permissionType() {
    return this.permissionForm.get('permissionType');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.permissionForm.valid) {
      this.notificationService.showError(USER_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.permission) {
      this.updatePermission(this.buildPermissionParams());
    } else {
      this.addPermission(this.buildPermissionParams());
    }
  }

  buildPermissionParams() {
    return {
      name: `Can ${capitalize(this.permissionType.value)} ${
        this.modules.value
      }`,
      type: this.permissionType.value,
      group: this.modules.value
    };
  }

  addPermission(params) {
    this.isLoading = true;
    this.permissionService.addPermission(params).subscribe(
      response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Permission added successfully');
      },
      error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      }
    );
  }

  updatePermission(params) {
    this.isLoading = true;
    const id = this.permission.id;
    this.permissionService.updatePermission(id, params).subscribe(response => {
      this.isLoading = false;
      this.notificationService.showSuccess('Permission updated successfully');
    });
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
      return 'View Permission';
    }
    return 'Add Permission';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditPermission() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.PERMISSIONS);
  }
}
