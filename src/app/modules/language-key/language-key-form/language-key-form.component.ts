import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { ActionType } from 'src/app/shared/models/general';
import { LanguageKey } from '../language-key';
import { FormService } from 'src/app/core/services/form.service';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import { Labels } from 'src/app/shared/models/input';

@Component({
  selector: 'app-language-key-form',
  templateUrl: './language-key-form.component.html',
  styleUrls: ['./language-key-form.component.sass']
})
export class LanguageKeyFormComponent extends BaseFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {
    super();
  }

  languageKeyForm: FormGroup;
  @Input() languageKey: LanguageKey;
  @Input() canEditLanguageKey = false;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || this.actionError && this.languageKeyForm) {
      return false;
    }
    if (this.languageKey) {
      this.buildExistingLanguageKeyForm();
    } else {
      this.buildNewLanguageKeyForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewLanguageKeyForm() {
    this.languageKeyForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  buildExistingLanguageKeyForm() {
    this.languageKeyForm = this.form.group({
      id: [this.languageKey.id],
      name: [this.languageKey.name, [Validators.required]],
      description: [this.languageKey.description, [Validators.required]]
    });
  }

  get name() {
    return this.languageKeyForm.get('name');
  }

  get description() {
    return this.languageKeyForm.get('description');
  }

  buildLanguageKeyParams(): LanguageKey {
    const languageKey = new LanguageKey();
    languageKey.id = this.languageKeyForm.get('id')
      ? this.languageKeyForm.get('id').value
      : '';
    languageKey.name = this.name.value;
    languageKey.description = this.description.value;
    return languageKey;
  }

  get buttonLabel() {
    if (this.isLoadingAction) {
      return Labels.LOADING;
    }
    if (this.actionType === ActionType.EDIT) {
      return Labels.UPDATE;
    }
    return Labels.ADD;
  }

  performAction(formDirective: FormGroupDirective) {
    this.formGroupDirective = formDirective;
    if (!this.formService.isFormValid(this.languageKeyForm)) {
      return false;
    }
    this.submitForm.emit(this.buildLanguageKeyParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.languageKey && this.isLoading;
  }
}
