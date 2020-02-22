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
import { LanguageKeyService } from '../language-key.service';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LanguagekeyStoreSelectors, LanguagekeyStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of } from 'rxjs';
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

    this.isLoading$ = this.store$.select(
      LanguagekeyStoreSelectors.selectIsLoadingItem
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
       .subscribe(errorResponse => {
        this.notificationService.showError(errorResponse.payload.error.message);
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
  }

  performAction(languageKey: LanguageKey) {
    if (this.actionType === ActionType.EDIT) {
      this.updateLanguageKey(languageKey);
    } else {
      this.addLanguageKey(languageKey);
    }
  }

  addLanguageKey(languageKey: LanguageKey) {
    this.store$.dispatch(
      new LanguagekeyStoreActions.AddLanguageKeyRequestAction(languageKey)
    );
  }

  updateLanguageKey(languageKey: LanguageKey) {
    const id = languageKey.id;
    this.store$.dispatch(
      new LanguagekeyStoreActions.UpdateLanguageKeyRequestAction(id, languageKey)
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

  get canEditLanguageKey$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.LANGUAGE_KEYS)
    );
  }
}
