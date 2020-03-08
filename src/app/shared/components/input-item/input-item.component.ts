import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss']
})
export class InputItemComponent implements OnInit {

  constructor(
    private validationMessageService: ValidationMessagesService
  ) { }

  @Input() id: string;
  @Input() name: string;
  @Input() title: string;
  @Input() type = 'text';
  @Input() formControlItem: FormControl;

  ngOnInit() {
  }

  get validationMessages() {
    return this.validationMessageService.getValidationMessages();
  }


}
