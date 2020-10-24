import { Component, Input, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputComponent implements OnInit {

  @Input() rows = 9;
  constructor(validationService: ValidationMessagesService) {
    super(validationService);
  }

  ngOnInit(): void {}
}
