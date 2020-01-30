import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  RootStoreState,
  UserStoreActions,
  UserStoreSelectors
} from 'src/app/root-store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private authorizationService: AuthorizationService,
    private validationMessagesService: ValidationMessagesService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  userForm: FormGroup;
  actionType: ActionType;
  user: User;
  user$: Observable<User>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;
  isLoadingUser = false;
  isLoading = false;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getUser(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildNewUserForm();
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      UserStoreSelectors.selectUserActionError
    );

    this.isLoadingAction$ = this.store$.select(
      UserStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_USER_SUCCESS ||
            action.type === ActionTypes.ADD_USER_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'User Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'User Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_USER_FAILURE ||
            action.type === ActionTypes.ADD_USER_FAILURE
        )
      )
      .subscribe(() => {
        this.notificationService.showError(
          'An Error has Occurred. Please try again'
        );
      });
  }

  getUser(id: number) {
    this.store$.dispatch(new UserStoreActions.GetUserRequestAction(id));
    this.user$ = this.store$.select(UserStoreSelectors.selectUserById(id));
    this.loadingErrors$ = this.store$.select(
      UserStoreSelectors.selectUserLoadingError
    );
    this.buildExistingUserForm();
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
    this.user$.subscribe(user => {
      this.user = user;
      this.userForm = this.form.group({
        firstName: [user.firstName, [Validators.required]],
        lastName: [user.lastName, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        mobile: [user.mobile, [Validators.required]]
      });
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
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.actionType === ActionType.EDIT) {
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

  addUser(params: User) {
    this.store$.dispatch(new UserStoreActions.AddUserRequestAction(params));
  }

  updateUser(params: User) {
    const id = this.user.id;
    this.store$.dispatch(
      new UserStoreActions.UpdateUserRequestAction(id, params)
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
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.USERS)
    );
  }
}
