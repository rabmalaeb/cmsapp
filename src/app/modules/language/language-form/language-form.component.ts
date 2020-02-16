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
import { Language } from '../language';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.sass']
})
export class LanguageFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService
  ) { }

  languageForm: FormGroup;
  @Input() language: Language;
  @Input() actionType: ActionType;
  @Input() isLoadingAction: boolean;
  @Input() canEditLanguage = false;
  @Input() isLoading: boolean;
  @Output() submitForm = new EventEmitter<Language>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() { }

  ngOnChanges() {
    if (this.isLoadingAction) {
      return false;
    }
    if (this.language) {
      this.buildExistingLanguageForm();
    } else {
      this.buildNewLanguageForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewLanguageForm() {
    this.languageForm = this.form.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }

  buildExistingLanguageForm() {
    this.languageForm = this.form.group({
      id: [this.language.id],
      name: [this.language.name, [Validators.required]],
      code: [this.language.code, [Validators.required]]
    });
  }

  get name() {
    return this.languageForm.get('name');
  }

  get code() {
    return this.languageForm.get('code');
  }

  buildLanguageParams(): Language {
    return {
      id: this.languageForm.get('id') ? this.languageForm.get('id').value : '',
      name: this.name.value,
      code: this.code.value
    };
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
    if (!this.languageForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    this.submitForm.emit(this.buildLanguageParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.language && this.isLoading;
  }
}
