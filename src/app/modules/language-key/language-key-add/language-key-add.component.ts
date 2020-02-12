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
import { LanguageKey } from '../language-key';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LanguageKeyService } from '../language-key.service';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LanguagekeyStoreSelectors, LanguagekeyStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';

@Component({
  selector: 'app-language-key-add',
  templateUrl: './language-key-add.component.html',
  styleUrls: ['./language-key-add.component.scss']
})
export class LanguageKeyAddComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private errorHandler: ErrorHandlerService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  languageKeyForm: FormGroup;
  actionType: ActionType;
  languageKey: LanguageKey;
  isLoadingLanguageKey = false;
  isLoading = false;
  categories: Category[] = [];
  languageKey$: Observable<LanguageKey>;
  isLoading$: Observable<boolean>;
  isLoadingAction$: Observable<boolean>;
  loadingErrors$: Observable<string[]>;
  actionErrors$: Observable<string[]>;

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach(param => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getLanguageKey(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
        this.buildNewLanguageKeyForm();
      }
    });
  }

  initializeStoreVariables() {
    this.actionErrors$ = this.store$.select(
      LanguagekeyStoreSelectors.selectLanguagekeyActionError
    );

    this.isLoadingAction$ = this.store$.select(
      LanguagekeyStoreSelectors.selectIsLoadingAction
    );

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_LANGUAGEKEY_SUCCESS ||
            action.type === ActionTypes.ADD_LANGUAGEKEY_SUCCESS
        )
      )
      .subscribe(() => {
        let message = 'LanguageKey Updated Successfully';
        if (this.actionType === ActionType.ADD) {
          message = 'LanguageKey Added Successfully';
        }
        this.notificationService.showSuccess(message);
      });

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === ActionTypes.UPDATE_LANGUAGEKEY_FAILURE ||
            action.type === ActionTypes.ADD_LANGUAGEKEY_FAILURE
        )
      )
       .subscribe(response => {
        this.errorHandler.handleErrorResponse(response.payload.error);
      });
  }

  getLanguageKey(id: number) {
    this.store$.dispatch(
      new LanguagekeyStoreActions.GetLanguageKeyRequestAction(id)
    );
    this.languageKey$ = this.store$.select(
      LanguagekeyStoreSelectors.selectLanguagekeyById(id)
    );
    this.loadingErrors$ = this.store$.select(
      LanguagekeyStoreSelectors.selectLanguagekeyLoadingError
    );
    this.buildExistingLanguageKeyForm();
  }

  buildNewLanguageKeyForm() {
    this.languageKeyForm = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  buildExistingLanguageKeyForm() {
    this.languageKey$.subscribe(languageKey => {
      this.languageKey = languageKey;
      this.languageKeyForm = this.form.group({
        name: [languageKey.name, [Validators.required]],
        description: [languageKey.description, [Validators.required]]
      });
    });
  }

  buildForm() {
    let name = '';
    let description = '';
    if (this.languageKey) {
      name = this.languageKey.name;
      description = this.languageKey.description;
    }
    this.languageKeyForm = this.form.group({
      name: [name, [Validators.required]],
      description: [description, [Validators.required]]
    });
  }

  get name() {
    return this.languageKeyForm.get('name');
  }

  get description() {
    return this.languageKeyForm.get('description');
  }

  performAction(formData: any, formDirective: FormGroupDirective) {
    if (!this.languageKeyForm.valid) {
      this.notificationService.showError(ALERT_MESSAGES.FORM_NOT_VALID);
      return;
    }
    if (this.languageKey) {
      this.updateLanguageKey(this.buildLanguageKeyParams());
    } else {
      this.addLanguageKey(this.buildLanguageKeyParams());
    }
  }

  buildLanguageKeyParams(): LanguageKey {
    const languageKey = new LanguageKey();
    languageKey.name = this.name.value;
    languageKey.description = this.description.value;
    return languageKey;
  }

  addLanguageKey(params: LanguageKey) {
    this.store$.dispatch(
      new LanguagekeyStoreActions.AddLanguageKeyRequestAction(params)
    );
  }

  updateLanguageKey(params: LanguageKey) {
    const id = this.languageKey.id;
    this.store$.dispatch(
      new LanguagekeyStoreActions.UpdateLanguageKeyRequestAction(id, params)
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
      return 'View Language Key';
    }
    return 'Add Language Key';
  }

  get validationMessages() {
    return this.validationMessagesService.getValidationMessages();
  }

  get canEditKey() {
    if (this.actionType === ActionType.ADD) {
      return true;
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.LANGUAGE_KEYS)
    );
  }
}
