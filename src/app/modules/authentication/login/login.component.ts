import { Component, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { LoginRequest } from './login';
import { AuthenticationStoreActions, AuthenticationStoreSelectors } from '../store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AuthenticationWorkflowService } from '../authentication-workflow.service';
import { AuthenticationSteps } from '../authentication';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/services/form.service';
import { ErrorMessages } from 'src/app/shared/models/messages';

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
    private router: Router,
    private authenticationWorkflowService: AuthenticationWorkflowService,
    private store$: Store<RootStoreState.State>,
    private actionsSubject$: ActionsSubject,
    private authenticationService: AuthenticationService,
    private formService: FormService,
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
      AuthenticationStoreSelectors.selectLoginRequestLoading
    );

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOGIN_SUCCESS))
      .subscribe(response => {
        this.authenticationService.setUserSession(response.payload.item);
        this.router.navigate(['/']).then(() => {
          location.reload();
        });
      });

    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActionTypes.LOGIN_FAILURE))
      .subscribe(() => {
        this.notificationService.showError(ErrorMessages.COULD_NOT_LOGIN_IN);
      });
  }

  login(formData: any, formDirective: FormGroupDirective) {
    if (!this.formService.isFormValid(this.loginForm)) {
      return false;
    }
    const params: LoginRequest = {
      email: this.email.value,
      password: this.password.value
    };
    this.store$.dispatch(new AuthenticationStoreActions.LoginRequestAction(params));
  }

  goToResetPassword() {
    this.authenticationWorkflowService.setCurrentStep(AuthenticationSteps.RESET_PASSWORD);
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
