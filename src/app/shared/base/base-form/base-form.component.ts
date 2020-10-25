import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActionType } from '../../models/general';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export abstract class BaseFormComponent implements OnInit {
  @Input() actionError: boolean;
  @Input() isLoadingAction: boolean;
  @Input() isLoading: boolean;
  @Input() actionType: ActionType;
  @Output() submitForm = new EventEmitter<any>();
  formGroupDirective: FormGroupDirective;
  constructor() {}

  ngOnInit(): void {}
}
