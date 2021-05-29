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
import { Translation } from '../translation';
import { Language } from '../../language/language';
import { LanguageKey } from '../../language-key/language-key';
import { FormService } from 'src/app/core/services/form.service';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import { Labels } from 'src/app/shared/models/input';

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.sass'],
})
export class TranslationFormComponent
  extends BaseFormComponent
  implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) {
    super();
  }

  translationForm: FormGroup;
  @Input() translation: Translation;
  @Input() languages: Language[];
  @Input() languageKeys: LanguageKey[];
  @Input() canEditTranslation = false;
  @Input() isLoadingLanguageKeys: boolean;
  @Input() isLoadingLanguages: boolean;

  ngOnInit() {}

  ngOnChanges() {
    if (this.isLoadingAction || (this.actionError && this.translationForm)) {
      return false;
    }
    if (this.translation) {
      this.buildExistingTranslationForm();
    } else {
      this.buildNewTranslationForm();
      if (this.formGroupDirective) {
        this.formGroupDirective.resetForm();
      }
    }
  }

  buildNewTranslationForm() {
    this.translationForm = this.form.group({
      languageId: ['', [Validators.required]],
      languageKeyId: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });
  }

  buildExistingTranslationForm() {
    this.translationForm = this.form.group({
      id: [this.translation.id],
      languageId: [this.translation.languageId, [Validators.required]],
      languageKeyId: [this.translation.languageKeyId, [Validators.required]],
      value: [this.translation.value, [Validators.required]],
    });
  }

  get languageId() {
    return this.translationForm.get('languageId');
  }

  get languageKeyId() {
    return this.translationForm.get('languageKeyId');
  }

  get value() {
    return this.translationForm.get('value');
  }

  buildTranslationParams(): Translation {
    const translation = new Translation();
    (translation.id = this.translationForm.get('id')
      ? this.translationForm.get('id').value
      : ''),
      (translation.languageId = this.languageId.value);
    translation.languageKeyId = this.languageKeyId.value;
    translation.value = this.value.value;
    return translation;
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
    if (!this.formService.isFormValid(this.translationForm)) {
      return false;
    }
    this.submitForm.emit(this.buildTranslationParams());
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get isLoadingForm() {
    return !this.translation && this.isLoading;
  }
}
