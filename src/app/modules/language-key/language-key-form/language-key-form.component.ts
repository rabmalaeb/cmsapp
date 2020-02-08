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
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES } from 'src/app/models/general';
import { LanguageKey } from '../language-key';

@Component({
  selector: 'app-language-key-form',
  templateUrl: './language-key-form.component.html',
  styleUrls: ['./language-key-form.component.sass']
})
export class LanguageKeyFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService
  ) {}

  languageKeyForm: FormGroup;
  @Input() languageKey: LanguageKey;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditLanguageKey = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<LanguageKey>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction) {
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
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  performAction(formDirective: FormGroupDirective) {
    this.formGroupDirective = formDirective;
    if (!this.languageKeyForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
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
