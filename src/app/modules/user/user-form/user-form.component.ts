import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { User } from '../user';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  userForm: FormGroup;
  @Input() user: User;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditUser = false;
  @Input() isLoading: boolean;
  @Input() actionErrors: boolean;
  @Output() submitForm = new EventEmitter<User>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || this.actionErrors && this.userForm) {
      return false;
    }
    if (this.user) {
      this.buildExistingUserForm();
    } else {
      this.buildNewUserForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewUserForm() {
    this.userForm = this.form.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]]
    });
  }

  buildExistingUserForm() {
    this.userForm = this.form.group({
      id: [this.user.id],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      mobile: [this.user.mobile, [Validators.required]]
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get mobile() {
    return this.userForm.get('mobile');
  }

  buildUserParams(): User {
    return {
      id: this.userForm.get('id') ? this.userForm.get('id').value : '',
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      mobile: this.mobile.value
    };
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

  performAction(formDirective: FormGroupDirective) {
    this.formGroupDirective = formDirective;
    if (!this.formService.isFormValid(this.userForm)) {
      return false;
    }
    this.submitForm.emit(this.buildUserParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.user && this.isLoading;
  }
}
