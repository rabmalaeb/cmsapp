import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, USER_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Translation } from '../translation';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { TranslationService } from '../translation.service';
import { LanguageService } from '../../language/language.service';
import { LanguageKeyService } from '../../languagekey/languagekey.service';
import { PartnerService } from '../../partner/partner.service';
import { Partner } from '../../partner/partner';
import { LanguageKey } from '../../languagekey/languagekey';
import { Language } from '../../language/language';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-translation-add',
  templateUrl: './translation-add.component.html',
  styleUrls: ['./translation-add.component.scss']
})
export class TranslationAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private errorHandler: ErrorHandlerService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private languageKeyService: LanguageKeyService,
    private partnerService: PartnerService,
  ) {}

  translationForm: FormGroup;
  actionType: ActionType;
  translation: Translation;
  isLoadingTranslation = false;
  isLoadingLanguages = false;
  isLoadingPartners = false;
  isLoadingLanguageKeys = false;
  isLoading = false;
  partners: Partner[] = [];
  languages: Language[] = [];
  languageKeys: LanguageKey[] = [];

  ngOnInit() {
    this.getLanguageKeys();
    this.getLanguages();
    this.getPartners();
    this.route.params.forEach(param => {
      if (param.id) {
        this.getTranslation(param.id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildForm();
      }
    });
  }

  getLanguages() {
    this.isLoadingLanguages = true;
    this.languageService.getLanguages().subscribe(response => {
      this.isLoadingLanguages = false;
      this.languages = response;
    });
  }

  getPartners() {
    this.isLoadingPartners = true;
    this.partnerService.getPartners().subscribe(response => {
      this.isLoadingPartners = false;
      this.partners = response;
    });
  }

  getLanguageKeys() {
    this.isLoadingLanguageKeys = true;
    this.languageKeyService.getLanguageKeys().subscribe(response => {
      this.isLoadingLanguageKeys = false;
      this.languageKeys = response;
    });
  }

  getTranslation(id: number) {
    this.isLoadingTranslation = true;
    this.translationService.getTranslation(id).subscribe(response => {
      this.isLoadingTranslation = false;
      this.translation = response;
      this.buildForm();
    }, error => {
      this.isLoading = false;
      this.errorHandler.handleErrorResponse(error);
    });
  }

  buildForm() {
    let partnerId: number;
    let languageId: number;
    let languageKeyId: number;
    let value: string;
    if (this.translation) {
      console.log('translation si ', this.translation);

      languageId = this.translation.languageId;
      partnerId = this.translation.partnerId;
      languageKeyId = this.translation.languageKeyId;
      value = this.translation.value;
    }
    this.translationForm = this.form.group({
      languageId: [languageId, [Validators.required]],
      partnerId: [partnerId, [Validators.required]],
      languageKeyId: [languageKeyId, [Validators.required]],
      value: [value, [Validators.required]],
    });
  }

  get languageId() {
    return this.translationForm.get('languageId');
  }

  get partnerId() {
    return this.translationForm.get('partnerId');
  }

  get languageKeyId() {
    return this.translationForm.get('languageKeyId');
  }

  get value() {
    return this.translationForm.get('value');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.translationForm.valid) {
      this.notificationService.showError(USER_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.translation) {
      this.updateTranslation(this.buildTranslationParams());
    } else {
      this.addTranslation(this.buildTranslationParams());
    }
  }

  buildTranslationParams(): Translation {
    const translation = new Translation();
    translation.partnerId = this.partnerId.value;
    translation.languageId = this.languageId.value;
    translation.languageKeyId = this.languageKeyId.value;
    translation.value = this.value.value;
    return translation;
  }

  addTranslation(params) {
    this.isLoading = true;
    this.translationService
      .addTranslation(params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Translation added successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  updateTranslation(params) {
    this.isLoading = true;
    const id = this.translation.id;
    this.translationService
      .updateTranslation(id, params)
      .subscribe(response => {
        this.isLoading = false;
        this.notificationService.showSuccess('Translation updated successfully');
      }, error => {
        this.isLoading = false;
        this.errorHandler.handleErrorResponse(error);
      });
  }

  get buttonLabel() {
    if (this.isLoading) {
      return 'Loading';
    }
    if (this.actionType === ActionType.EDIT) {
      return 'Update';
    }
    return 'Add';
  }

  get title() {
    if (this.actionType === ActionType.EDIT) {
      return 'View Translation';
    }
    return 'Add Translation';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditTranslation() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.TRANSLATIONS);
  }
}
