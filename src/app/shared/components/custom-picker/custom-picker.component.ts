import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { checkFormControlErrors } from '../../models/input';

@Component({
  selector: 'app-custom-picker',
  templateUrl: './custom-picker.component.html',
  styleUrls: ['./custom-picker.component.css']
})
export class CustomPickerComponent implements OnInit {

  @Input() label: string;
  @Input() formControl: FormControl;
  @Input() validate: string;
  @Input() selector: string;
  @Input() filter: () => void;
  @Output() dateTimeChange = new EventEmitter<any>();
  @ViewChild('input') inputItem: ElementRef;
  errorMessages = [];

  constructor(
    private validationService: ValidationMessagesService
  ) { }

  ngOnInit() {
  }

  triggerInputClick() {
    this.inputItem.nativeElement.click();
  }

  get hasError() {
    return checkFormControlErrors(this.formControl, this.errorMessages)
      .hasError;
  }

  get errorMessage() {
    return checkFormControlErrors(this.formControl, this.errorMessages)
      .errorMessage;
  }

  getErrorMessages() {
    this.errorMessages = this.validationService.getValidationMessages()[
      this.validate
    ];
  }

  triggerDateTimeChange($event: any) {
    this.dateTimeChange.emit($event);
  }

}
