import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationMessagesService } from 'src/app/core/services/validation-messages.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActionType } from 'src/app/shared/models/general';
import { ModuleName } from 'src/app/shared/models/nav';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../language';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { Observable, of, Subscription } from 'rxjs';
import { LanguageStoreSelectors, LanguageStoreActions } from '../store';
import { filter } from 'rxjs/operators';
import { ActionTypes } from '../store/actions';
import { BaseActionComponent } from 'src/app/shared/base/base-action/base-action.component';

@Component({
  selector: 'app-language-add',
  templateUrl: './language-add.component.html',
  styleUrls: ['./language-add.component.scss'],
})
export class LanguageAddComponent
  extends BaseActionComponent
  implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private validationMessagesService: ValidationMessagesService,
    private authorizationService: AuthorizationService,
    private actionsSubject$: ActionsSubject,
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {
    super();
  }

  actionType: ActionType;
  language$: Observable<Language>;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.initializeStoreVariables();
    this.route.params.forEach((param) => {
      if (param.id) {
        const id = parseInt(param.id, 0);
        this.getLanguage(id);
        this.actionType = ActionType.EDIT;
      } else {
        this.actionType = ActionType.ADD;
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

    this.isLoading$ = this.store$.select(
      LanguageStoreSelectors.selectIsLoadingItem
    );

    this.subscriptions.push(
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
        })
    );

    this.subscriptions.push(
      this.actionsSubject$
        .pipe(
          filter(
            (action: any) =>
              action.type === ActionTypes.UPDATE_LANGUAGE_FAILURE ||
              action.type === ActionTypes.ADD_LANGUAGE_FAILURE
          )
        )
        .subscribe((errorResponse) => {
          this.notificationService.showError(
            errorResponse.payload.error.message
          );
        })
    );
  }

  getLanguage(id: number) {
    this.store$.dispatch(new LanguageStoreActions.GetLanguageRequestAction(id));
    this.language$ = this.store$.select(
      LanguageStoreSelectors.selectLanguageById(id)
    );
    this.loadingErrors$ = this.store$.select(
      LanguageStoreSelectors.selectLanguageLoadingError
    );
  }

  performAction(language: Language) {
    if (this.actionType === ActionType.EDIT) {
      this.updateLanguage(language);
    } else {
      this.addLanguage(language);
    }
  }

  addLanguage(language: Language) {
    this.store$.dispatch(
      new LanguageStoreActions.AddLanguageRequestAction(language)
    );
  }

  updateLanguage(language: Language) {
    const id = language.id;
    this.store$.dispatch(
      new LanguageStoreActions.UpdateLanguageRequestAction(id, language)
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

  get canEditLanguage$() {
    if (this.actionType === ActionType.ADD) {
      return of(true);
    }
    return (
      this.actionType === ActionType.EDIT &&
      this.authorizationService.canEdit(ModuleName.LANGUAGES)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
