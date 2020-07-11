import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { checkFormControlErrors } from '../../models/input';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  @Input() label: string;
  @Input() formControlItem: FormControl;
  errorMessages = [];

  constructor(private validationService: ValidationMessagesService) {}

  ngOnInit() {
    this.getErrorMessages();
  }

  get hasError() {
    return checkFormControlErrors(this.formControlItem, this.errorMessages)
      .hasError;
  }

  get errorMessage() {
    return checkFormControlErrors(this.formControlItem, this.errorMessages)
      .errorMessage;
  }

  getErrorMessages() {
    this.errorMessages = this.validationService.getValidationMessages().requiredField;
  }
}
