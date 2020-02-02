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
import { Role } from '../../role/role';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { CustomValidations } from 'src/app/validators/custom-validations';
import { Observable } from 'rxjs';
import { AdminStoreSelectors, AdminStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  RootStoreState,
  RoleStoreSelectors,
  RoleStoreActions
} from 'src/app/root-store';
import { ActionTypes } from '../store/actions';
import { filter, map } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  adminForm: FormGroup;
  actionType: ActionType;
  admin: Admin;
  isLoadingAdmin = false;
  isLoading = false;
  roles$: Observable<Role[]>;
  isLoadingRoles: boolean;
  showTogglePassword: boolean;
  willSetPassword: boolean;
  admin$: Observable<Admin>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.getRoles();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getAdmin(id);
        this.actionType = ActionType.EDIT;
        this.showTogglePassword = true;
      } else {
        this.actionType = ActionType.ADD;
        this.showTogglePassword = false;
        this.willSetPassword = true;
        this.buildNewAdminForm();
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      AdminStoreSelectors.selectAdminActionError
    );

    this.isLoadingAction$ = this.store$.select(
      AdminStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_ADMIN_SUCCESS ||
            action.type === ActionTypes.ADD_ADMIN_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Admin Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Admin Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_ADMIN_FAILURE ||
            action.type === ActionTypes.ADD_ADMIN_FAILURE
        )
      )
       .subscribe(response => {
        this.errorHandler.handleErrorResponse(response.payload.error);
      });
  }

  getAdmin(id: number) {
    this.store$.dispatch(new AdminStoreActions.GetAdminRequestAction(id));
    this.admin$ = this.store$.select(AdminStoreSelectors.selectAdminById(id));
    this.loadingErrors$ = this.store$.select(
      AdminStoreSelectors.selectAdminLoadingError
    );
    this.buildExistingAdminForm();
  }

  buildNewAdminForm() {
    this.adminForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });
    if (!this.showTogglePassword) {
      this.addPasswordControlsAndValidations();
    }
  }

  buildExistingAdminForm() {
    this.admin$.subscribe(admin => {
      this.admin = admin;
      this.adminForm = this.form.group({
        name: [admin.name, [Validators.required]],
        description: [admin.description, [Validators.required]],
        email: [admin.email, [Validators.required, Validators.email]],
        roleId: [admin.roleId, [Validators.required]],
        active: [admin.active, [Validators.required]]
      });
    });
    if (!this.showTogglePassword) {
      this.addPasswordControlsAndValidations();
    }
  }

  getRoles() {
    this.store$.dispatch(new RoleStoreActions.LoadRequestAction());
    this.roles$ = this.store$.select(RoleStoreSelectors.selectAllRoleItems);
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
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
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
    this.store$.dispatch(new AdminStoreActions.AddAdminRequestAction(params));
  }

  updateAdmin(params: Admin) {
    const id = this.admin.id;
    this.store$.dispatch(
      new AdminStoreActions.UpdateAdminRequestAction(id, params)
    );
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
