import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  Validators,
  FormControl
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { Role } from '../../role/role';
import { RoleService } from '../../role/role.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ActionType, USER_MESSAGES, ModuleName } from 'src/app/models/general';
import { CustomValidations } from 'src/app/validators/custom-validations';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private adminService: AdminService,
    private roleService: RoleService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private errorHandler: ErrorHandlerService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute
  ) {}

  adminForm: FormGroup;
  actionType: ActionType;
  admin: Admin;
  isLoadingAdmin = false;
  isLoading = false;
  roles: Role[];
  isLoadingRoles: boolean;
  showTogglePassword: boolean;
  willSetPassword: boolean;

  ngOnInit() {
    this.route.params.forEach(param => {
      if (param.id) {
        this.getAdmin(param.id);
        this.actionType = ActionType.EDIT;
        this.showTogglePassword = true;
      } else {
        this.actionType = ActionType.ADD;
        this.showTogglePassword = false;
        this.willSetPassword = true;
        this.initializeForm();
      }
    });
  }

  getAdmin(id: number) {
    this.isLoadingAdmin = true;
    this.adminService.getAdmin(id).subscribe(response => {
      this.isLoadingAdmin = false;
      this.admin = response;
      this.initializeForm();
    });
  }

  initializeForm() {
    this.buildForm();
    this.getRoles();
  }

  getRoles() {
    this.isLoadingRoles = true;
    this.roleService.getRoles().subscribe(response => {
      this.roles = response;
      this.isLoadingRoles = false;
    });
  }

  buildForm() {
    let name = '';
    let description = '';
    let email = '';
    let active = true;
    let roleId: number;
    if (this.admin) {
      name = this.admin.name;
      description = this.admin.description;
      email = this.admin.email;
      active = this.admin.active;
      roleId = this.admin.roleId;
    }
    this.adminForm = this.form.group({
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
      email: [email, [Validators.required, Validators.email]],
      roleId: [roleId, [Validators.required]],
      active: [active, [Validators.required]]
    });
    if (!this.showTogglePassword) {
      this.addPasswordControlsAndValidations();
    }
  }

  get name() {
    return this.adminForm.get('name');
  }

  get description() {
    return this.adminForm.get('description');
  }

  get email() {
    return this.adminForm.get('email');
  }

  get roleId() {
    return this.adminForm.get('roleId');
  }

  get active() {
    return this.adminForm.get('active');
  }

  get password() {
    return this.adminForm.get('password');
  }

  get confirmPassword() {
    return this.adminForm.get('confirmPassword');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.adminForm.valid) {
      this.notificationService.showError(USER_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.admin) {
      this.updateAdmin(this.buildAdminParams());
    } else {
      this.addAdmin(this.buildAdminParams());
    }
  }

  buildAdminParams(): Admin {
    const admin: Admin = {
      name: this.name.value,
      description: this.description.value,
      email: this.email.value,
      active: this.active.value,
      roleId: this.roleId.value
    };
    if (this.willSetPassword) {
      admin.password = this.password.value;
    }
    return admin;
  }

  addAdmin(params: Admin) {
    this.isLoading = true;
    this.adminService.addAdmin(params).subscribe(
      () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Admin added successfully');
      },
      error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      }
    );
  }

  updateAdmin(params: Admin) {
    this.isLoading = true;
    const id = this.admin.id;
    this.adminService.updateAdmin(id, params).subscribe(response => {
      this.isLoading = false;
      this.notificationService.showSuccess('Admin updated successfully');
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
      return 'View Admin';
    }
    return 'Add Admin';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditAdmin() {
    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.ADMINS)
    );
  }

  togglePassword() {
    this.willSetPassword = !this.willSetPassword;
    this.updateFormValidations();
  }

  updateFormValidations() {
    if (this.willSetPassword) {
      this.addPasswordControlsAndValidations();
    } else {
      this.removePasswordControlsAndValidations();
    }
  }

  addPasswordControlsAndValidations() {
    this.adminForm.addControl(
      'password',
      new FormControl('', [Validators.required])
    );
    this.adminForm.addControl(
      'confirmPassword',
      new FormControl('', [Validators.required])
    );
    this.adminForm.setValidators(CustomValidations.MatchPasswords);
    this.adminForm.updateValueAndValidity();
  }

  removePasswordControlsAndValidations() {
    this.adminForm.removeControl('password');
    this.adminForm.removeControl('confirmPassword');
    this.adminForm.clearValidators();
    this.adminForm.updateValueAndValidity();
  }
}
