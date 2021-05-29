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
  RootStoreState,
  AuthenticationStoreSelectors,
  AuthenticationStoreActions,
} from 'src/app/root-store';
import { Store, ActionsSubject } from '@ngrx/store';
import { ActionTypes } from '../store/actions';
import { map, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { StorageParams } from 'src/app/shared/models/general';
import { ErrorMessages } from 'src/app/shared/models/messages';
import { Router } from '@angular/router';
import { CustomValidations } from 'src/app/shared/validators/custom-validations';
import { AuthenticationService } from '../authentication.service';
import { FormService } from 'src/app/core/services/form.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationWorkflowService } from '../authentication-workflow.service';
import { AuthenticationSteps } from '../authentication';
import { Labels } from 'src/app/shared/models/input';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private validationMessageService: ValidationMessagesService,
    private cookieService: CookieService,
    private authenticationWorkflowService: AuthenticationWorkflowService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private store$: Store<RootStoreState.State>,
    private actionsSubject$: ActionsSubject,
    private formService: FormService,
    private router: Router,
    private form: FormBuilder
  ) {}

  setPasswordForm: FormGroup;
  isLoading$: Observable<boolean>;
  identifier: string;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.checkAndSetIdentifier();
    this.buildForm();
    this.initializeStoreVariables();
  }

  buildForm() {
    this.setPasswordForm = this.form.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidations.MatchPasswords,
      }
    );
  }

  initializeStoreVariables() {
    this.isLoading$ = this.store$.select(
      AuthenticationStoreSelectors.selectSetPasswordLoadingError
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.SET_PASSWORD_SUCCESS
          )
        )
        .subscribe((response) => {
          this.authenticationWorkflowService.setCurrentStep(
            AuthenticationSteps.LOGIN
          );
          this.notificationService.showSuccess('Password Updated Successfully');
        })
    );
    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) => action.type === ActionTypes.SET_PASSWORD_FAILURE
          )
        )
        .subscribe((error) => {
          const message = error.payload.error.message;
          this.notificationService.showError(message);
        })
    );
  }

  setPassword(formData: any, formDirective: FormGroupDirective) {
    if (!this.formService.isFormValid(this.setPasswordForm)) {
      return false;
    }
    const params = {
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
      identifier: this.identifier,
      token: this.authenticationService.getToken(),
    };
    this.store$.dispatch(
      new AuthenticationStoreActions.SetPasswordRequestAction(params)
    );
  }

  private checkAndSetIdentifier() {
    if (!this.cookieService.check(StorageParams.RESET_PASSWORD_IDENTIFIER)) {
      this.notificationService.showError(ErrorMessages.SOMETHING_WENT_WRONG);
      this.router.navigate(['/']);
    }
    this.identifier = this.cookieService.get(
      StorageParams.RESET_PASSWORD_IDENTIFIER
    );
  }

  get password() {
    return this.setPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.setPasswordForm.get('confirmPassword');
  }

  get validationMessages() {
    return this.validationMessageService.getValidationMessages();
  }

  get resetLabel() {
    return this.isLoading$.pipe(
      map((isLoading) => {
        if (isLoading) {
          return Labels.LOADING;
        }
        return Labels.SET_PASSWORD;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
