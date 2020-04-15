import { Injectable } from '@angular/core';
import { AuthenticationSteps } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationWorkflowService {
  constructor() { }

  private selectedStep: AuthenticationSteps;

  setSelectedStep(step: AuthenticationSteps) {
    this.selectedStep = step;
  }

  getSelectedStep() {
    return this.selectedStep;
  }

}
