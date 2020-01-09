import { Component, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { LoginService } from '../login.service';
import { NotificationService } from 'src/app/services/notification.service';

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
    private loginService: LoginService
  ) {}

  loginForm: FormGroup;
  isLoading: boolean;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(formData: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    const params = {
      email: this.email.value,
      password: this.password.value
    };
    this.loginService.login(params).subscribe(
      response => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.notificationService.showError(
          'Could not login with the provided credentials'
        );
      }
    );
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
    if (this.isLoading) {
      return 'Logging In';
    }
    return 'Login';
  }
}
