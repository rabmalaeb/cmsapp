import { Component, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { LoginRequest } from '../login';
import { LoginStoreActions, LoginStoreSelectors } from '../store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private validationMessageService: ValidationMessagesService,
    private notificationService: NotificationService,
    private form: FormBuilder,
    private store$: Store<RootStoreState.State>,
    private actionsSubject$: ActionsSubject,
    private authenticationService: AuthenticationService
  ) {}

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.buildForm();
    this.initializeStoreVariables();
  }

  buildForm() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  initializeStoreVariables() {
    this.isLoading$ = this.store$.select(
      LoginStoreSelectors.selectLoginIsLoading
    );

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOAD_SUCCESS))
      .subscribe(response => {
        this.authenticationService.setUserSession(response.payload.item);
        location.reload();
      });

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOAD_FAILURE))
      .subscribe(() => {
        const message = 'Could not log you in with the provided credentials';
        this.notificationService.showError(message);
      });
  }

  login(formData: any, formDirective: FormGroupDirective) {
    const params: LoginRequest = {
      email: this.email.value,
      password: this.password.value
    };
    this.store$.dispatch(new LoginStoreActions.LoadRequestAction(params));
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get validationMessages() {
    return this.validationMessageService.getValidationMessages();
  }

  get loginLabel() {
    return this.isLoading$.pipe(
      map(isLoading => {
        if (isLoading) {
          return 'Logging In';
        }
        return 'Login';
      })
    );
  }
}
