import { Component, OnInit } from '@angular/core';
import { AuthenticationWorkflowService } from '../authentication-workflow.service';
import { AuthenticationSteps } from '../authentication';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authentication-box',
  templateUrl: './authentication-box.component.html',
  styleUrls: ['./authentication-box.component.scss']
})
export class AuthenticationBoxComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationWorkflowService: AuthenticationWorkflowService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.checkRoute();
  }

  private checkRoute() {
    let step = AuthenticationSteps.LOGIN;
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.get('token')) {
        step = AuthenticationSteps.SET_NEW_PASSWORD;
        this.authenticationService.setToken(params.get('token'));
      }
      this.authenticationWorkflowService.setCurrentStep(step);
    });
  }

  get isLogIn() {
    return (
      this.authenticationWorkflowService.getCurrentStep() ===
      AuthenticationSteps.LOGIN
    );
  }

  get isResetPassword() {
    return (
      this.authenticationWorkflowService.getCurrentStep() ===
      AuthenticationSteps.RESET_PASSWORD
    );
  }

  get isSetNewPassword() {
    return (
      this.authenticationWorkflowService.getCurrentStep() ===
      AuthenticationSteps.SET_NEW_PASSWORD
    );
  }
}
