import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ActivatedRoute } from '@angular/router';
import { LanguageKey } from '../language-key';
import { Category } from '../../category/category';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { LanguagekeyStoreSelectors, LanguagekeyStoreActions } from '../store';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { ModuleName } from 'src/app/shared/models/nav';
import { BaseActionComponent } from 'src/app/shared/base/base-action/base-action.component';

@Component({
  selector: 'app-language-key-add',
  templateUrl: './language-key-add.component.html',
  styleUrls: ['./language-key-add.component.scss'],
})
export class LanguageKeyAddComponent
  extends BaseActionComponent
  implements OnInit, OnDestroy {
  constructor(
    private form: FormBuilder,
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {
    super();
  }

  languageKeyForm: FormGroup;
  actionType: ActionType;
  languageKey: LanguageKey;
  isLoadingLanguageKey = false;
  isLoading = false;
  categories: Category[] = [];
  languageKey$: Observable<LanguageKey>;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach((param) => {
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

    this.subscriptions.push(
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
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_LANGUAGEKEY_FAILURE ||
              action.type === ActionTypes.ADD_LANGUAGEKEY_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
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
      new LanguagekeyStoreActions.UpdateLanguageKeyRequestAction(
        id,
        languageKey
      )
    );
  }

  get buttonLabel() {
    return this.isLoadingAction$.pipe(
      map((isLoading) => {
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
