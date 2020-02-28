import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Admin } from '../admin';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { CustomValidations } from 'src/app/validators/custom-validations';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { Role } from '../../role/role';
import { NotificationService } from 'src/app/services/notification.service';
import { ALERT_MESSAGES, ActionType } from 'src/app/models/general';
import { Partner } from '../../partner/partner';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private notificationService: NotificationService
  ) {}

  @Input() admin: Admin;
  @Input() roles: Role[];
  @Input() partners: Partner[];
  @Input() isLoading = false;
  @Input() canEditAdmin = false;
  @Input() isLoadingAction = false;
  @Input() actionType: ActionType;
  @Output() submitForm = new EventEmitter<Admin>();
  formGroupDirective: FormGroupDirective;
  showTogglePassword = false;
  willSetPassword = false;
  adminForm: FormGroup;

  ngOnInit() {
    if (this.actionType === ActionType.EDIT) {
      this.showTogglePassword = true;
    } else {
      this.showTogglePassword = false;
      this.willSetPassword = true;
    }
  }

  ngOnChanges() {
    if (this.isLoadingAction) {
      return false;
    }
    if (this.admin) {
      this.buildExistingAdminForm();
    } else {
      this.buildNewAdminForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewAdminForm() {
    const partnerId = this.authenticationService.getCurrentUser().partnerId;
    this.adminForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
      partnerId: [partnerId ? partnerId : '', [Validators.required]],
      active: ['', [Validators.required]]
    });
    if (!this.showTogglePassword) {
      this.addPasswordControlsAndValidations();
    }
  }

  buildExistingAdminForm() {
    this.adminForm = this.form.group({
      id: [this.admin.id],
      name: [this.admin.name, [Validators.required]],
      description: [this.admin.description, [Validators.required]],
      email: [this.admin.email, [Validators.required, Validators.email]],
      partnerId: [this.admin.partnerId, [Validators.required]],
      roleId: [this.admin.roleId, [Validators.required]],
      active: [this.admin.active, [Validators.required]]
    });
    if (!this.showTogglePassword) {
      this.addPasswordControlsAndValidations();
    }
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

  performAction(formGroupDirective: FormGroupDirective) {
    this.formGroupDirective = formGroupDirective;
    if (!this.adminForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    this.submitForm.emit(this.buildAdminParams());
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

  buildAdminParams(): Admin {
    const form = this.adminForm;
    const admin: Admin = {
      id: form.get('id') ? form.get('id').value : '',
      name: this.name.value,
      description: this.description.value,
      email: this.email.value,
      active: this.active.value,
      partnerId: this.partnerId.value,
      roleId: this.roleId.value
    };
    if (this.willSetPassword) {
      admin.password = form.get('password').value;
    }
    return admin;
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }
}
