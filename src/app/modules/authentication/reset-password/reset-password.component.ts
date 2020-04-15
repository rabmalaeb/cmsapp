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
import { LoginStoreActions, LoginStoreSelectors } from '../store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AuthenticationWorkflowService } from '../authenticaion-workflow.service';
import { AuthenticationSteps } from '../authentication';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private validationMessageService: ValidationMessagesService,
    private notificationService: NotificationService,
    private form: FormBuilder,
    private authenticationWorkflowService: AuthenticationWorkflowService,
    private store$: Store<RootStoreState.State>,
    private actionsSubject$: ActionsSubject,
    private authenticationService: AuthenticationService
  ) { }

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.buildForm();
    this.initializeStoreVariables();
  }

  buildForm() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]]
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
    const params = {
      email: this.email.value,
    };
    this.authenticationWorkflowService.setSelectedStep(AuthenticationSteps.SET_NEW_PASSWORD);
    // this.store$.dispatch(new LoginStoreActions.LoadRequestAction(params));
  }

  gotToLogin() {
    this.authenticationWorkflowService.setSelectedStep(AuthenticationSteps.LOGIN);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get validationMessages() {
    return this.validationMessageService.getValidationMessages();
  }

  get resetLabel() {
    return this.isLoading$.pipe(
      map(isLoading => {
        if (isLoading) {
          return 'Resetting';
        }
        return 'Reset Password';
      })
    );
  }
}
