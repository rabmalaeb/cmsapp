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

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.sass']
})
export class TranslationFormComponent implements OnInit, OnChanges {
  constructor(
    private form: FormBuilder,
    private formService: FormService,
    private validationMessagesService: ValidationMessagesService
  ) { }

  translationForm: FormGroup;
  @Input() translation: Translation;
  @Input() actionType: ActionType;
  @Input() languages: Language[];
  @Input() languageKeys: LanguageKey[];
  @Input() isLoadingAction: boolean;
  @Input() canEditTranslation = false;
  @Input() isLoading: boolean;
  @Input() isLoadingLanguageKeys: boolean;
  @Input() isLoadingLanguages: boolean;
  @Output() submitForm = new EventEmitter<Translation>();
  formGroupDirective: FormGroupDirective;

  ngOnInit() { }

  ngOnChanges() {
    if (this.isLoadingAction) {
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
      value: ['', [Validators.required]]
    });
  }

  buildExistingTranslationForm() {
    this.translationForm = this.form.group({
      id: [this.translation.id],
      languageId: [this.translation.languageId, [Validators.required]],
      languageKeyId: [this.translation.languageKeyId, [Validators.required]],
      value: [this.translation.value, [Validators.required]]
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
    translation.id = this.translationForm.get('id') ? this.translationForm.get('id').value : '',
    translation.languageId = this.languageId.value;
    translation.languageKeyId = this.languageKeyId.value;
    translation.value = this.value.value;
    return translation;
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
