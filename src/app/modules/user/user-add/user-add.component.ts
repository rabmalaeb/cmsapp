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
import { User } from '../user';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from '../user.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private authorizationService: AuthorizationService,
    private validationMessagesService: ValidationMessagesService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) {}

  userForm: FormGroup;
  actionType: ActionType;
  user: User;
  isLoadingUser = false;
  isLoading = false;

  ngOnInit() {
    this.route.params.forEach(param => {
      if (param.id) {
        this.getUser(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildForm();
      }
    });
  }

  getUser(id: number) {
    this.isLoadingUser = true;
    this.userService.getUser(id).subscribe(response => {
      this.isLoadingUser = false;
      this.user = response;
      this.buildForm();
    });
  }

  buildForm() {
    let firstName = '';
    let lastName = '';
    let email = '';
    let mobile = '';
    if (this.user) {
      firstName = this.user.firstName;
      lastName = this.user.lastName;
      email = this.user.email;
      mobile = this.user.mobile;
    }
    this.userForm = this.form.group({
      firstName: [firstName, [Validators.required]],
      lastName: [lastName, [Validators.required]],
      email: [email, [Validators.required, Validators.email]],
      mobile: [mobile, [Validators.required]]
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

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.userForm.valid) {
      this.notificationService.showError(USER_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.user) {
      this.updateUser(this.buildUserParams());
    } else {
      this.addUser(this.buildUserParams());
    }
  }

  buildUserParams(): User {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      mobile: this.mobile.value
    };
  }

  addUser(params) {
    this.isLoading = true;
    this.userService.addUser(params).subscribe(
      response => {
        this.isLoading = false;
        this.notificationService.showSuccess('User added successfully');
      },
      error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      }
    );
  }

  updateUser(params) {
    this.isLoading = true;
    const id = this.user.id;
    this.userService.updateUser(id, params).subscribe(response => {
      this.isLoading = false;
      this.notificationService.showSuccess('User updated successfully');
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
      return 'View User';
    }
    return 'Add User';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditUser() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.USERS);
  }
}
