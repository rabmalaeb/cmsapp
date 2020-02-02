import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/services/validation-messages.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionType, ALERT_MESSAGES, ModuleName } from 'src/app/models/general';
import { ActivatedRoute } from '@angular/router';
import { Translation } from '../translation';
import { Partner } from '../../partner/partner';
import { LanguageKey } from '../../language-key/language-key';
import { Language } from '../../language/language';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  RootStoreState,
  PartnerStoreActions,
  PartnerStoreSelectors
} from 'src/app/root-store';
import { Observable } from 'rxjs';
import { TranslationStoreSelectors, TranslationStoreActions } from '../store';
import { ActionTypes } from '../store/actions';
import { filter, map } from 'rxjs/operators';
import {
  LanguageStoreActions,
  LanguageStoreSelectors
} from '../../language/store';
import {
  LanguagekeyStoreActions,
  LanguagekeyStoreSelectors
} from '../../language-key/store';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-translation-add',
  templateUrl: './translation-add.component.html',
  styleUrls: ['./translation-add.component.scss']
})
export class TranslationAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,

    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>
  ) {}

  translationForm: FormGroup;
  actionType: ActionType;
  translation: Translation;
  isLoadingTranslation = false;
  isLoadingLanguages = false;
  isLoadingPartners = false;
  isLoadingLanguageKeys = false;
  isLoading = false;
  partners$: Observable<Partner[]>;
  languages$: Observable<Language[]>;
  languageKeys$: Observable<LanguageKey[]>;
  translation$: Observable<Translation>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.getLanguageKeys();
    this.getLanguages();
    this.getPartners();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getTranslation(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildNewTranslationForm();
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationActionError
    );

    this.isLoadingAction$ = this.store$.select(
      TranslationStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_TRANSLATION_SUCCESS ||
            action.type === ActionTypes.ADD_TRANSLATION_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Translation Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Translation Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_TRANSLATION_FAILURE ||
            action.type === ActionTypes.ADD_TRANSLATION_FAILURE
        )
      )
       .subscribe(response => {
        this.errorHandler.handleErrorResponse(response.payload.error);
      });
  }

  getTranslation(id: number) {
    this.store$.dispatch(
      new TranslationStoreActions.GetTranslationRequestAction(id)
    );
    this.translation$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationById(id)
    );
    this.loadingErrors$ = this.store$.select(
      TranslationStoreSelectors.selectTranslationLoadingError
    );
    this.buildExistingTranslationForm();
  }

  buildNewTranslationForm() {
    this.translationForm = this.form.group({
      languageId: ['', [Validators.required]],
      partnerId: ['', [Validators.required]],
      languageKeyId: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
  }

  buildExistingTranslationForm() {
    this.translation$.subscribe(translation => {
      this.translation = translation;
      this.translationForm = this.form.group({
        languageId: [translation.languageId, [Validators.required]],
        partnerId: [translation.partnerId, [Validators.required]],
        languageKeyId: [translation.languageKeyId, [Validators.required]],
        value: [translation.value, [Validators.required]]
      });
    });
  }

  getLanguages() {
    this.store$.dispatch(new LanguageStoreActions.LoadRequestAction());
    this.languages$ = this.store$.select(
      LanguageStoreSelectors.selectAllLanguageItems
    );
  }

  getPartners() {
    this.store$.dispatch(new PartnerStoreActions.LoadRequestAction());
    this.partners$ = this.store$.select(
      PartnerStoreSelectors.selectAllPartnerItems
    );
  }

  getLanguageKeys() {
    this.store$.dispatch(new LanguagekeyStoreActions.LoadRequestAction());
    this.languageKeys$ = this.store$.select(
      LanguagekeyStoreSelectors.selectAllLanguagekeyItems
    );
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
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
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

  addTranslation(params: Translation) {
    this.store$.dispatch(
      new TranslationStoreActions.AddTranslationRequestAction(params)
    );
  }

  updateTranslation(params: Translation) {
    const id = this.translation.id;
    this.store$.dispatch(
      new TranslationStoreActions.UpdateTranslationRequestAction(id, params)
    );
  }

  get buttonLabel() {
    return this.isLoadingAction$.pipe(
      map(isLoading => {
        if (isLoading) {
          return 'Loading';
        }
        if (this.actionType === ActionType.EDIT) {
          return 'Update';
        }
        return 'Add';
      })
    );
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
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.TRANSLATIONS)
    );
  }
}
