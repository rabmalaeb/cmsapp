import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Admin, AdminRequest } from '../admin';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective
} from '@angular/forms';
import { CustomValidations } from 'src/app/shared/validators/custom-validations';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { Role } from '../../role/role';
import { ActionType } from 'src/app/shared/models/general';
import { Partner } from '../../partner/partner';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.sass']
})
export class AdminFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private validationMessagesService: ValidationMessagesService,
    private authenticationService: AuthenticationService,
    private formService: FormService
  ) {}

  @Input() admin: Admin;
  @Input() roles: Role[];
  @Input() partners: Partner[];
  @Input() isLoading = false;
  @Input() actionError: boolean;
  @Input() canEditAdmin = false;
  @Input() isLoadingAction = false;
  @Input() actionType: ActionType;
  @Output() submitForm = new EventEmitter<AdminRequest>();
  @Output() getRolesForPartner = new EventEmitter<number>();
  formGroupDirective: FormGroupDirective;
  showTogglePassword = false;
  shouldSetPassword = false;
  adminForm: FormGroup;

  ngOnInit() {
    if (this.actionType === ActionType.EDIT) {
      this.showTogglePassword = true;
    } else {
      this.showTogglePassword = false;
      this.shouldSetPassword = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.roles && !changes.roles.firstChange) {
      return false;
    }
    if (this.isLoadingAction || this.actionError) {
      return false;
    }
    if (this.admin) {
      this.buildExistingAdminForm();
    } else {
      this.buildNewAdminForm();
    }
    if (
      changes.isLoadingAction &&
      !changes.isLoadingAction.isFirstChange() &&
      !changes.isLoadingAction.currentValue
    ) {
      this.formGroupDirective.resetForm();
    }
  }

  buildNewAdminForm() {
    const partnerId = this.authenticationService.getCurrentUser().partnerId;
    this.adminForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
      country: ['', [Validators.required]],
      partnerId: [partnerId ? partnerId : '', [Validators.required]],
      active: ['', [Validators.required]]
    });
    this.addPasswordControlsAndValidations();
  }

  buildExistingAdminForm() {
    this.adminForm = this.form.group({
      id: [this.admin.id],
      name: [this.admin.name, [Validators.required]],
      description: [this.admin.description, [Validators.required]],
      email: [this.admin.email, [Validators.required, Validators.email]],
      partnerId: [this.admin.partnerId, [Validators.required]],
      country: [this.admin.country, [Validators.required]],
      roleId: [this.admin.roleId, [Validators.required]],
      active: [this.admin.active, [Validators.required]]
    });
    if (this.shouldSetPassword) {
      this.addPasswordControlsAndValidations();
    }
  }

  togglePassword() {
    this.shouldSetPassword = !this.shouldSetPassword;
    this.updateFormValidations();
  }

  updateFormValidations() {
    if (this.shouldSetPassword) {
      this.addPasswordControlsAndValidations();
    } else {
      this.removePasswordControlsAndValidations();
    }
  }

  private addPasswordControlsAndValidations() {
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

  performAction(formGroupDirective: FormGroupDirective) {
    this.formGroupDirective = formGroupDirective;
    if (!this.formService.isFormValid(this.adminForm)) {
      return false;
    }
    this.submitForm.emit(this.buildAdminFilterRequest());
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

  get partnerId() {
    return this.adminForm.get('partnerId');
  }

  get active() {
    return this.adminForm.get('active');
  }

  get password() {
    return this.adminForm.get('password');
  }

  get country() {
    return this.adminForm.get('country');
  }

  get confirmPassword() {
    return this.adminForm.get('confirmPassword');
  }

  get buttonLabel() {
    if (this.isLoadingAction) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  get isLoadingForm() {
    return !this.admin && this.isLoading;
  }

  buildAdminFilterRequest(): AdminRequest {
    const form = this.adminForm;
    const admin: AdminRequest = {
      id: form.get('id') ? form.get('id').value : '',
      name: this.name.value,
      description: this.description.value,
      email: this.email.value,
      active: this.active.value,
      country: this.country.value,
      partnerId: this.partnerId.value,
      roleId: this.roleId.value
    };
    if (this.shouldSetPassword) {
      admin.password = form.get('password').value;
      admin.confirmPassword = form.get('confirmPassword').value;
    }
    return admin;
  }

  getRoles() {
    this.roleId.setValue('');
    this.getRolesForPartner.emit(this.partnerId.value);
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }
}
