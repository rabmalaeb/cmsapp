import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import {
  AuthenticationStoreActions,
  AuthenticationStoreSelectors,
} from '../store';
import { AuthenticationWorkflowService } from '../authentication-workflow.service';
import { AuthenticationSteps } from '../authentication';
import { Store, ActionsSubject } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { ActionTypes } from '../store/actions';
import { map, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { StorageParams } from 'src/app/shared/models/general';
import { FormService } from 'src/app/core/services/form.service';
import { CookieService } from 'ngx-cookie-service';
import { ErrorMessages } from 'src/app/shared/models/messages';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private validationMessageService: ValidationMessagesService,
    private notificationService: NotificationService,
    private authenticationWorkflowService: AuthenticationWorkflowService,
    private store$: Store<RootStoreState.State>,
    private actionsSubject$: ActionsSubject,
    private formService: FormService,
    private cookieService: CookieService,
    private form: FormBuilder
  ) {}

  resetPasswordForm: FormGroup;
  isLoading$: Observable<boolean>;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.buildForm();
    this.initializeStoreVariables();
  }

  buildForm() {
    this.resetPasswordForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  initializeStoreVariables() {
    this.isLoading$ = this.store$.select(
      AuthenticationStoreSelectors.selectResetPasswordRequestLoading
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.RESET_PASSWORD_SUCCESS
          )
        )
        .subscribe((response) => {
          this.notificationService.showSuccess(response.payload.message);
        })
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.RESET_PASSWORD_FAILURE
          )
        )
        .subscribe((error) => {
          this.notificationService.showError(ErrorMessages.RESET_REQUEST_ERROR);
        })
    );
  }

  sendResetPassword(formData: any, formDirective: FormGroupDirective) {
    if (!this.formService.isFormValid(this.resetPasswordForm)) {
      return false;
    }
    const email = this.email.value;
    this.addResetPasswordIdentifierToStorage(email);
    const params = {
      email,
    };
    this.store$.dispatch(
      new AuthenticationStoreActions.ResetPasswordRequestAction(params)
    );
  }

  gotToLogin() {
    this.authenticationWorkflowService.setCurrentStep(
      AuthenticationSteps.LOGIN
    );
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get validationMessages() {
    return this.validationMessageService.getValidationMessages();
  }

  get resetLabel() {
    return this.isLoading$.pipe(
      map((isLoading) => {
        if (isLoading) {
          return 'Resetting';
        }
        return 'Reset Password';
      })
    );
  }

  private addResetPasswordIdentifierToStorage(identifier: string) {
    if (this.cookieService.check(StorageParams.RESET_PASSWORD_IDENTIFIER)) {
      this.cookieService.delete(StorageParams.RESET_PASSWORD_IDENTIFIER);
    }
    this.cookieService.set(StorageParams.RESET_PASSWORD_IDENTIFIER, identifier);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
