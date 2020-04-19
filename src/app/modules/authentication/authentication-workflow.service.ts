import { Injectable } from '@angular/core';
import { AuthenticationSteps } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationWorkflowService {
  constructor() { }

  private step: AuthenticationSteps;

  setCurrentStep(step: AuthenticationSteps) {
    this.step = step;
  }

  getCurrentStep() {
    return this.step;
  }

}
