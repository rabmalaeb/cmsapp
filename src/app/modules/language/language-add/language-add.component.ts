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
import { Language } from '../language';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LanguageService } from '../language.service';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { LanguageStoreSelectors, LanguageStoreActions } from '../store';
import { filter, map } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';

@Component({
  selector: 'app-language-add',
  templateUrl: './language-add.component.html',
  styleUrls: ['./language-add.component.scss']
})
export class LanguageAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private languageService: LanguageService,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) { }

  languageForm: FormGroup;
  actionType: ActionType;
  language: Language;
  isLoadingLanguage = false;
  isLoading = false;
  categories: Category[] = [];
  language$: Observable<Language>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<String[]>;
  actionErrors$: Observable<String[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getLanguage(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildNewLanguageForm();
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      LanguageStoreSelectors.selectLanguageActionError
    );

    this.isLoadingAction$ = this.store$.select(
      LanguageStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_LANGUAGE_SUCCESS ||
            action.type === ActionTypes.ADD_LANGUAGE_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'Language Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'Language Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_LANGUAGE_FAILURE ||
            action.type === ActionTypes.ADD_LANGUAGE_FAILURE
        )
      )
      .subscribe(() => {
        this.notificationService.showError(
          'An Error has Occurred. Please try again'
        );
      });
  }

  getLanguage(id: number) {
    this.store$.dispatch(new LanguageStoreActions.GetLanguageRequestAction(id));
    this.language$ = this.store$.select(LanguageStoreSelectors.selectLanguageById(id));
    this.loadingErrors$ = this.store$.select(
      LanguageStoreSelectors.selectLanguageLoadingError
    );
    this.buildExistingLanguageForm();
  }

  buildNewLanguageForm() {
    this.languageForm = this.form.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  buildExistingLanguageForm() {
    this.language$.subscribe(language => {
      this.language = language;
      this.languageForm = this.form.group({
        name: [language.name, [Validators.required]],
        code: [language.code, [Validators.required]],
      });
    });
  }

  get name() {
    return this.languageForm.get('name');
  }

  get code() {
    return this.languageForm.get('code');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.languageForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.language) {
      this.updateLanguage(this.buildLanguageParams());
    } else {
      this.addLanguage(this.buildLanguageParams());
    }
  }

  buildLanguageParams(): Language {
    const language = new Language();
    language.name = this.name.value;
    language.code = this.code.value;
    return language;
  }

  addLanguage(params: Language) {
    this.store$.dispatch(new LanguageStoreActions.AddLanguageRequestAction(params));
  }

  updateLanguage(params: Language) {
    const id = this.language.id;
    this.store$.dispatch(
      new LanguageStoreActions.UpdateLanguageRequestAction(id, params)
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
      return 'View Language';
    }
    return 'Add Language';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditLanguage() {

    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return this.actionType === ActionType.EDIT && this.authorizationService.canEdit(ModuleName.LANGUAGES);
  }
}
