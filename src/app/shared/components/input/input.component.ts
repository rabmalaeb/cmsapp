import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { checkFormControlErrors } from '../../models/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string = null;
  @Input() type: string;
  @Input() id: string;
  @Input() name: string;
  @Input() for: string;
  @Input() formControlItem: FormControl;
  @Input() readonly: boolean;
  errorMessages = [];
  constructor(private validationService: ValidationMessagesService) {}
  @ViewChild('input') inputItem: ElementRef;

  ngOnInit() {
    this.getErrorMessages();
  }

  moveFocusToInput() {
    this.inputItem.nativeElement.focus();
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
