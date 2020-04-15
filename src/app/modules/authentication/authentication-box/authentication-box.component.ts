import { Component, OnInit } from '@angular/core';
import { AuthenticationWorkflowService } from '../authenticaion-workflow.service';
import { AuthenticationSteps } from '../authentication';

@Component({
  selector: 'app-authentication-box',
  templateUrl: './authentication-box.component.html',
  styleUrls: ['./authentication-box.component.scss']
})
export class AuthenticationBoxComponent implements OnInit {

  constructor(private authenticationWorkflowService: AuthenticationWorkflowService) { }

  ngOnInit() {
    this.authenticationWorkflowService.setSelectedStep(AuthenticationSteps.LOGIN);
  }

  get isLogIn() {
    return this.authenticationWorkflowService.getSelectedStep() === AuthenticationSteps.LOGIN;
  }

  get isResetPassword() {
    return this.authenticationWorkflowService.getSelectedStep() === AuthenticationSteps.RESET_PASSWORD;
  }

  get isSetNewPassword() {
    return this.authenticationWorkflowService.getSelectedStep() === AuthenticationSteps.SET_NEW_PASSWORD;
  }

}
